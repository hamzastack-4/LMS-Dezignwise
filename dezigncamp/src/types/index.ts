export type UserRole = "student" | "instructor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  studentId?: string;
  department?: string;
  semester?: number;
  joinedAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  instructorId: string;
  instructorName: string;
  category: string;
  totalLectures: number;
  completedLectures: number;
  progress: number;
  duration: string;
  enrolledAt: string;
  lastAccessedAt?: string;
  status: "active" | "completed" | "archived";
  tags: string[];
}

export interface Lecture {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  youtubeUrl: string;
  youtubeId: string;
  duration: number; // seconds
  order: number;
  moduleId: string;
  watchedSeconds: number;
  isCompleted: boolean;
  lastWatchedAt?: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lectures: Lecture[];
}

export interface Note {
  id: string;
  lectureId: string;
  courseId: string;
  content: string;
  timestamp: number; // video timestamp
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: "assignment" | "quiz" | "gdb" | "exam";
  dueDate: string;
  totalMarks: number;
  submittedAt?: string;
  score?: number;
  status: "pending" | "submitted" | "graded" | "overdue";
  fileUrl?: string;
}

export interface Grade {
  id: string;
  courseId: string;
  courseName: string;
  assignments: number;
  quizzes: number;
  exams: number;
  gdb: number;
  total: number;
  grade: string;
  semester: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  type: "lecture" | "assignment" | "exam" | "reminder" | "event";
  courseId?: string;
  color?: string;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  courseId?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface StudyPlan {
  id: string;
  userId: string;
  weeklyGoalHours: number;
  dailySchedule: DailySchedule[];
  generatedAt: string;
  recommendations: string[];
}

export interface DailySchedule {
  day: string;
  sessions: StudySession[];
}

export interface StudySession {
  courseId: string;
  courseName: string;
  duration: number; // minutes
  startTime: string;
  topic: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseName: string;
  issuedAt: string;
  fileUrl: string;
  verificationCode: string;
}

export interface Analytics {
  totalCourses: number;
  completedCourses: number;
  totalWatchTime: number; // minutes
  averageProgress: number;
  currentStreak: number;
  totalNotes: number;
  submittedAssignments: number;
  averageGrade: number;
}
