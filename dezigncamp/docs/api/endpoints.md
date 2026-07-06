# DezignCamp LMS — Full API Endpoint Reference

## Base URL
```
Production: https://api.dezigncamp.edu/v1
Development: http://localhost:8000/api/v1
```

## Authentication
All protected endpoints require:
```
Authorization: Bearer <sanctum_token>
Content-Type: application/json
Accept: application/json
```

---

## 🔐 Auth APIs

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login, returns token | No |
| POST | `/auth/logout` | Invalidate token | Yes |
| POST | `/auth/refresh` | Refresh token | Yes |
| POST | `/auth/forgot-password` | Send reset email | No |
| POST | `/auth/reset-password` | Reset with token | No |
| GET | `/auth/me` | Current user profile | Yes |
| PUT | `/auth/me` | Update profile | Yes |
| POST | `/auth/me/avatar` | Upload avatar (S3) | Yes |
| POST | `/auth/verify-email/{id}/{hash}` | Verify email | No |

---

## 👤 User APIs

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/users` | List all users | admin |
| GET | `/users/{id}` | Get user detail | admin |
| PUT | `/users/{id}` | Update user | admin |
| DELETE | `/users/{id}` | Soft delete user | admin |
| POST | `/users/{id}/suspend` | Suspend user | admin |
| GET | `/users/{id}/activity` | Activity log | admin |

---

## 📚 Course APIs

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/courses` | Browse courses | All |
| POST | `/courses` | Create course | instructor |
| GET | `/courses/{id}` | Course detail | All |
| PUT | `/courses/{id}` | Update course | instructor |
| DELETE | `/courses/{id}` | Delete course | instructor/admin |
| POST | `/courses/{id}/publish` | Publish course | instructor |
| GET | `/courses/{id}/modules` | List modules | Enrolled |
| POST | `/courses/{id}/modules` | Add module | instructor |
| PUT | `/courses/{id}/modules/{mid}` | Update module | instructor |
| DELETE | `/courses/{id}/modules/{mid}` | Delete module | instructor |
| GET | `/courses/{id}/modules/{mid}/lectures` | List lectures | Enrolled |
| POST | `/courses/{id}/modules/{mid}/lectures` | Add lecture | instructor |
| PUT | `/courses/{id}/modules/{mid}/lectures/{lid}` | Update lecture | instructor |
| DELETE | `/courses/{id}/modules/{mid}/lectures/{lid}` | Delete lecture | instructor |
| POST | `/courses/import-youtube` | Import from YouTube URL | student/instructor |
| GET | `/courses/{id}/analytics` | Course analytics | instructor |

---

## 🎓 Enrollment APIs

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| POST | `/courses/{id}/enroll` | Enroll in course | student |
| DELETE | `/courses/{id}/unenroll` | Unenroll | student |
| GET | `/my/courses` | My enrolled courses | student |
| GET | `/my/courses/{id}` | My course detail | student |

---

## 📹 Progress APIs

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| POST | `/progress/lecture/{lid}` | Update watch progress | student |
| GET | `/progress/lecture/{lid}` | Get lecture progress | student |
| GET | `/progress/course/{cid}` | Course overall progress | student |
| POST | `/progress/lecture/{lid}/complete` | Mark as complete | student |
| GET | `/my/stats` | Learning statistics | student |

**Request body for progress update:**
```json
{
  "watched_seconds": 720,
  "last_position": 720,
  "is_completed": false
}
```

---

## 📝 Notes APIs

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/notes` | List my notes | student |
| POST | `/notes` | Create note | student |
| GET | `/notes/{id}` | Get note | student |
| PUT | `/notes/{id}` | Update note | student |
| DELETE | `/notes/{id}` | Delete note | student |
| GET | `/notes/lecture/{lid}` | Notes for lecture | student |
| POST | `/notes/{id}/summarize` | AI summarize | student |

---

## 📋 Assessment APIs

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/courses/{id}/assessments` | List assessments | Enrolled |
| POST | `/courses/{id}/assessments` | Create assessment | instructor |
| GET | `/assessments/{id}` | Assessment detail | Enrolled |
| PUT | `/assessments/{id}` | Update assessment | instructor |
| DELETE | `/assessments/{id}` | Delete assessment | instructor |
| POST | `/assessments/{id}/submit` | Submit response | student |
| GET | `/assessments/{id}/submissions` | View submissions | instructor |
| PUT | `/submissions/{id}/grade` | Grade submission | instructor |
| GET | `/my/assignments` | My assignments | student |
| GET | `/my/upcoming-deadlines` | Upcoming deadlines | student |

---

## 📊 Grades APIs

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/my/grades` | My grade book | student |
| GET | `/my/grades/course/{cid}` | Course grade detail | student |
| GET | `/courses/{id}/gradebook` | All students grades | instructor |
| PUT | `/grades/{id}` | Update grade | instructor |
| GET | `/grades/transcript` | Full transcript PDF | student |

---

## 📅 Calendar APIs

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/calendar` | My events | All |
| POST | `/calendar` | Create event | All |
| PUT | `/calendar/{id}` | Update event | All |
| DELETE | `/calendar/{id}` | Delete event | All |
| GET | `/calendar/upcoming` | Next 7 days events | All |

---

## ✅ Todo APIs

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/todos` | My todos | All |
| POST | `/todos` | Create todo | All |
| PUT | `/todos/{id}` | Update todo | All |
| DELETE | `/todos/{id}` | Delete todo | All |
| POST | `/todos/{id}/complete` | Toggle complete | All |

---

## 🔔 Notification APIs

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/notifications` | My notifications | All |
| POST | `/notifications/{id}/read` | Mark as read | All |
| POST | `/notifications/read-all` | Mark all read | All |
| DELETE | `/notifications/{id}` | Delete notification | All |
| GET | `/notifications/unread-count` | Unread count | All |

---

## 🧠 AI Study Plan APIs

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/study-plan` | Get active study plan | student |
| POST | `/study-plan/generate` | Generate AI plan | student |
| PUT | `/study-plan` | Update plan | student |
| GET | `/ai/recommendations` | AI course recommendations | student |
| POST | `/ai/inactivity-check` | Check & trigger reminders | system |

---

## 🎖 Certificate APIs

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/certificates` | My certificates | student |
| POST | `/certificates/generate/{course_id}` | Generate cert | system |
| GET | `/certificates/verify/{code}` | Public verify | Public |

---

## 👨‍💼 Admin APIs

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/admin/stats` | System overview | admin |
| GET | `/admin/users` | All users | admin |
| GET | `/admin/courses` | All courses | admin |
| GET | `/admin/activity` | Activity log | admin |
| POST | `/admin/broadcast` | Send broadcast notification | admin |
| GET | `/admin/reports/enrollment` | Enrollment report | admin |
| GET | `/admin/reports/completion` | Completion rate report | admin |

---

## ☁️ Storage APIs (S3 Proxy)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/upload/avatar` | Upload profile image |
| POST | `/upload/assignment` | Upload assignment file |
| POST | `/upload/certificate` | Upload certificate |
| POST | `/upload/course-asset` | Upload course file |
| DELETE | `/upload/{key}` | Delete S3 object |

---

## Rate Limiting
| Tier | Limit |
|------|-------|
| Auth endpoints | 10 req/min |
| AI endpoints | 20 req/min |
| Upload endpoints | 5 req/min |
| General API | 120 req/min |

## Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field": ["validation message"]
  },
  "code": 422
}
```

## Success Response Format
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "meta": {
    "current_page": 1,
    "total": 100,
    "per_page": 20
  }
}
```
