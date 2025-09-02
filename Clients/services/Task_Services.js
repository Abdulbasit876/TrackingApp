import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
    query, 
  where, 

} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { startOfWeek, endOfWeek } from "date-fns";
import { Text } from "react-native";

// ----------------------
// Foreground notification handler
// ----------------------
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// ----------------------
// Request notification permission
// ----------------------
export const requestNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    console.warn("Notifications permission not granted!");
    return false;
  }
  return true;
};
// ----------------------
// Get Current User UID
// ----------------------
const getUserUid = async () => {
  const userString = await AsyncStorage.getItem("user");
  if (!userString) throw new Error("User not found in storage");
  const user = JSON.parse(userString);
  return user.uid;
};

// ----------------------
// Get Notification Toggle (user setting)
// ----------------------
const isNotificationEnabled = async () => {
  const enabled = await AsyncStorage.getItem("notificationsEnabled");
  return enabled === "true"; // default false
};

// ----------------------
// Generate Notification Times
// ----------------------
const generateNotifications = (task) => {
  const notifications = [];
  const createdAt = new Date(task.createdAt);
  const deadline = new Date(task.deadline);

  const diffMinutes = (deadline - createdAt) / 60000;

  if (diffMinutes >= 30) {
    const midway = new Date(createdAt.getTime() + (deadline - createdAt) / 2);
    notifications.push({
      time: midway,
      message: `Midway Reminder: ${task.title}`,
    });
  }

  notifications.push({
    time: deadline,
    message: `Deadline Reached: ${task.title}`,
  });

  return notifications;
};

// ----------------------
// Schedule Local Notification
// ----------------------
const scheduleNotification = async (time, message) => {
  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) return null;

  if (time <= new Date()) return null; // skip past time

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: { title: "Task Reminder", body: message },
    trigger: { type: "date", date: time },
  });

  return notificationId;
};

// ----------------------
// Add Task
// ----------------------
export const addTask = async (task) => {
  try {
    const uid = await getUserUid();
    const createdAt = new Date();

    const newTask = {
      ...task,
      createdAt,
      isCompleted: false,
      timeSpent: null,
    };

    if (await isNotificationEnabled()) {
      const notifications = generateNotifications(newTask);
      const scheduledNotifications = [];

      for (let n of notifications) {
        const id = await scheduleNotification(n.time, n.message);
        if (id) scheduledNotifications.push({ ...n, id });
      }

      if (scheduledNotifications.length > 0) {
        newTask.notifications = scheduledNotifications;
      }
    }

    await addDoc(collection(db, "tasks", uid, "userTasks"), newTask);
    console.log("Task + Notifications added successfully!");
  } catch (error) {
    console.error("Error adding task: ", error);
  }
};

// ----------------------
// Get Tasks
// ----------------------
export const getTasks = async () => {
  try {
    const uid = await getUserUid();
    const querySnapshot = await getDocs(
      collection(db, "tasks", uid, "userTasks")
    );

    const tasks = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });

    return tasks;
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    return [];
  }
};

// ----------------------
// Update Task
// ----------------------
export const updateTask = async (taskId, updatedData) => {
  try {
    const uid = await getUserUid();
    const taskRef = doc(db, "tasks", uid, "userTasks", taskId);

    const taskSnap = await getDoc(taskRef);
    if (!taskSnap.exists()) {
      console.error("Task not found!");
      return;
    }

    const oldTask = taskSnap.data();
    let newData = { ...updatedData };

    if ((updatedData.deadline || updatedData.title) && (await isNotificationEnabled())) {
      const mergedTask = { ...oldTask, ...updatedData };
      const notifications = generateNotifications(mergedTask);
      const scheduledNotifications = [];

      for (let n of notifications) {
        if (!mergedTask.isCompleted) {
          const id = await scheduleNotification(n.time, n.message);
          if (id) scheduledNotifications.push({ ...n, id });
        }
      }

      newData.notifications = scheduledNotifications.length > 0 ? scheduledNotifications : [];
    }

    await updateDoc(taskRef, newData);
    console.log("Task updated successfully!");
  } catch (error) {
    console.error("Error updating task: ", error);
  }
};

// ----------------------
// Complete Task
// ----------------------
export const completeTask = async (taskId) => {
  try {
    const uid = await getUserUid();
    const taskRef = doc(db, "tasks", uid, "userTasks", taskId);

    const taskSnap = await getDoc(taskRef);
    if (!taskSnap.exists()) {
      console.error("Task not found!");
      return;
    }

    const taskData = taskSnap.data();
    const createdAt = taskData.createdAt?.toDate
      ? taskData.createdAt.toDate()
      : new Date(taskData.createdAt);
    const completedAt = new Date();

    let timeSpent = null;
    if (createdAt) timeSpent = Math.floor((completedAt - createdAt) / 60000);

    // Cancel pending notifications
    if (taskData.notifications) {
      for (let n of taskData.notifications) {
        if (n.id) await Notifications.cancelScheduledNotificationAsync(n.id);
      }
    }

    await updateDoc(taskRef, {
      isCompleted: true,
      completedAt,
      timeSpent,
      notifications: [], // clear notifications
    });

    console.log("Task marked as completed with timeSpent:", timeSpent);
  } catch (error) {
    console.error("Error completing task: ", error);
  }
};

// ----------------------
// Delete Task
// ----------------------
export const deleteTask = async (taskId) => {
  try {
    const uid = await getUserUid();
    const taskRef = doc(db, "tasks", uid, "userTasks", taskId);

    const taskSnap = await getDoc(taskRef);
    if (taskSnap.exists()) {
      const taskData = taskSnap.data();
      if (taskData.notifications) {
        for (let n of taskData.notifications) {
          if (n.id) await Notifications.cancelScheduledNotificationAsync(n.id);
        }
      }
    }

    await deleteDoc(taskRef);
    console.log("Task and its notifications deleted successfully!");
  } catch (error) {
    console.error("Error deleting task: ", error);
  }
};

// ----------------------
// Get Task By ID
// ----------------------
export const getTaskById = async (taskId) => {
  try {
    const uid = await getUserUid();
    const taskRef = doc(db, "tasks", uid, "userTasks", taskId);
    const taskSnap = await getDoc(taskRef);

    if (!taskSnap.exists()) return null;

    const data = taskSnap.data();
    return {
      id: taskSnap.id,
      title: data.title,
      description: data.description,
      priority: data.priority,
      deadline: data.deadline?.toDate ? data.deadline.toDate() : data.deadline,
      isCompleted: data.isCompleted || false,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
    };
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    return null;
  }
};

// ✅ Fetch Notifications
export const fetchNotifications = async () => {
  try {
    const userString = await AsyncStorage.getItem("user");
    if (!userString) return [];
    const user = JSON.parse(userString);

    const tasksRef = collection(db, "tasks", user.uid, "userTasks");
    const snapshot = await getDocs(tasksRef);

    let allNotis = [];

    snapshot.forEach((taskDoc) => {
      const task = taskDoc.data();
      if (task.notifications && Array.isArray(task.notifications)) {
        // Push notifications with taskId reference
        task.notifications.forEach((n) =>
          allNotis.push({ ...n, taskId: taskDoc.id })
        );
      }
    });

    // Sort: latest first
    allNotis.sort((a, b) => b.time.toMillis() - a.time.toMillis());

    return allNotis;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

// ✅ Delete Notification
export const deleteNotification = async (taskId, notificationId) => {
  try {
    const userString = await AsyncStorage.getItem("user");
    if (!userString) return;
    const user = JSON.parse(userString);

    const taskRef = doc(db, "tasks", user.uid, "userTasks", taskId);
    const snapshot = await getDocs(collection(db, "tasks", user.uid, "userTasks"));

    let taskData;
    snapshot.forEach((docSnap) => {
      if (docSnap.id === taskId) taskData = docSnap.data();
    });

    if (!taskData || !taskData.notifications) return;

    // Filter out the deleted notification
    const updatedNotifications = taskData.notifications.filter(
      (n) => n.id !== notificationId
    );

    await updateDoc(taskRef, { notifications: updatedNotifications });

    return true;
  } catch (error) {
    console.error("Error deleting notification:", error);
    return false;
  }
};

const normalizeDate = (val) => {
  if (!val) return null;
  if (val.toDate) return val.toDate(); // Firestore Timestamp
  if (val.toMillis) return new Date(val.toMillis()); 
  if (val instanceof Date) return val; 
  return new Date(val); 
};
export const getCompletedTasks = async () => {
  try {
    const uid = await getUserUid();
    const q = query(
      collection(db, "tasks", uid, "userTasks"),
      where("isCompleted", "==", true)
    );

    const snapshot = await getDocs(q);
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const now = new Date();
    const day = now.getDay();
    const diffToSunday = now.getDate() - day;
    const weekStart = new Date(now.setDate(diffToSunday));
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    return tasks.filter((task) => {
      const date = normalizeDate(task.completedAt);
      return date && date >= weekStart && date <= weekEnd;
    });
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
    return [];
  }
};
export const getBarData = (tasks) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const counts = Array(7).fill(0);

  tasks.forEach((task) => {
    const date = normalizeDate(task.completedAt);
    if (date) {
      const dayIndex = date.getDay();
      counts[dayIndex] += 1;
    }
  });

  return weekDays.map((day, idx) => ({
    value: counts[idx],
    label: day,
    topLabelComponent: () =>
      counts[idx] > 0 ? (
        <Text
          style={{
            color: "white",
            fontFamily: "popinMedium",
            fontSize: 12,
            textAlign: "center",
          }}
        >
          {counts[idx]}
        </Text>
      ) : null,
  }));
};
export const getPieData = (tasks) => {
  let summary = { High: 0, Medium: 0, Low: 0 };

  tasks.forEach((task) => {
    if (task.priority && task.timeSpent) {
      summary[task.priority] += task.timeSpent;
    }
  });

  return [
    { value: summary.High,  color: "#EF4444" },
    { value: summary.Medium, color: "#F97316" },
    { value: summary.Low,  color: "#22C55E" },
  ].filter((item) => item.value > 0);
};
