# DezignCamp LMS — Laravel Backend Architecture

## Technology Choices
- **Framework**: Laravel 11 (REST API)
- **Auth**: Laravel Sanctum (token-based, SPA-compatible)
- **Database**: PostgreSQL with Eloquent ORM
- **Storage**: Amazon S3 via Laravel Filesystem
- **Queue**: Laravel Queues with Redis for async jobs
- **Mail**: Laravel Mail (Mailgun driver)
- **AI**: OpenAI API via Guzzle HTTP client
- **Testing**: PHPUnit + Laravel Dusk

## Project Structure

```
dezigncamp-api/
├── app/
│   ├── Console/
│   │   └── Commands/
│   │       ├── InactivityCheckCommand.php    # Scheduled: check inactive students
│   │       ├── SendDeadlineReminders.php     # Scheduled: pre-deadline emails
│   │       └── RegenerateStudyPlans.php      # Weekly AI plan refresh
│   │
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── PasswordResetController.php
│   │   │   │   └── EmailVerificationController.php
│   │   │   │
│   │   │   ├── Student/
│   │   │   │   ├── CourseController.php
│   │   │   │   ├── ProgressController.php
│   │   │   │   ├── NoteController.php
│   │   │   │   ├── AssignmentController.php
│   │   │   │   ├── GradeController.php
│   │   │   │   ├── CalendarController.php
│   │   │   │   ├── TodoController.php
│   │   │   │   ├── StudyPlanController.php
│   │   │   │   ├── CertificateController.php
│   │   │   │   └── NotificationController.php
│   │   │   │
│   │   │   ├── Instructor/
│   │   │   │   ├── CourseController.php
│   │   │   │   ├── ModuleController.php
│   │   │   │   ├── LectureController.php
│   │   │   │   ├── AssessmentController.php
│   │   │   │   ├── GradeBookController.php
│   │   │   │   └── AnalyticsController.php
│   │   │   │
│   │   │   ├── Admin/
│   │   │   │   ├── UserController.php
│   │   │   │   ├── CourseController.php
│   │   │   │   ├── ReportController.php
│   │   │   │   └── SystemController.php
│   │   │   │
│   │   │   ├── AI/
│   │   │   │   ├── StudyPlanController.php
│   │   │   │   ├── RecommendationController.php
│   │   │   │   └── SummarizeController.php
│   │   │   │
│   │   │   └── UploadController.php
│   │   │
│   │   ├── Middleware/
│   │   │   ├── RoleMiddleware.php            # RBAC check
│   │   │   ├── EnrollmentMiddleware.php      # Check course enrollment
│   │   │   ├── RateLimitMiddleware.php
│   │   │   └── AuditLogMiddleware.php        # Log sensitive actions
│   │   │
│   │   └── Requests/
│   │       ├── Auth/LoginRequest.php
│   │       ├── Course/CreateCourseRequest.php
│   │       ├── Assessment/SubmitRequest.php
│   │       └── ...
│   │
│   ├── Models/
│   │   ├── User.php
│   │   ├── StudentProfile.php
│   │   ├── InstructorProfile.php
│   │   ├── Course.php
│   │   ├── Module.php
│   │   ├── Lecture.php
│   │   ├── Enrollment.php
│   │   ├── LectureProgress.php
│   │   ├── Note.php
│   │   ├── Assessment.php
│   │   ├── Question.php
│   │   ├── Submission.php
│   │   ├── GradeRecord.php
│   │   ├── Certificate.php
│   │   ├── CalendarEvent.php
│   │   ├── Todo.php
│   │   ├── Notification.php
│   │   ├── StudyPlan.php
│   │   └── ActivityLog.php
│   │
│   ├── Services/
│   │   ├── YouTubeService.php          # Parse YouTube URLs, fetch metadata
│   │   ├── ProgressService.php         # Calculate course progress
│   │   ├── GradeCalculatorService.php  # Weighted grade calculation
│   │   ├── CertificateService.php      # Generate & upload PDF to S3
│   │   ├── S3UploadService.php         # S3 operations
│   │   ├── NotificationService.php     # Push & email notifications
│   │   └── AI/
│   │       ├── StudyPlanService.php    # OpenAI GPT for study plans
│   │       ├── RecommendationService.php
│   │       └── SummarizeService.php
│   │
│   ├── Jobs/
│   │   ├── SendDeadlineReminderJob.php
│   │   ├── GenerateStudyPlanJob.php
│   │   ├── GenerateCertificateJob.php
│   │   ├── ProcessVideoUploadJob.php
│   │   └── SendInactivityEmailJob.php
│   │
│   ├── Notifications/
│   │   ├── DeadlineReminderNotification.php
│   │   ├── AssignmentGradedNotification.php
│   │   ├── InactivityAlertNotification.php
│   │   ├── CourseCompletedNotification.php
│   │   └── WelcomeNotification.php
│   │
│   ├── Policies/
│   │   ├── CoursePolicy.php
│   │   ├── AssessmentPolicy.php
│   │   └── UserPolicy.php
│   │
│   └── Resources/              # API Resources (JSON transformers)
│       ├── UserResource.php
│       ├── CourseResource.php
│       ├── LectureResource.php
│       └── ...
│
├── database/
│   ├── migrations/             # All schema migrations
│   └── seeders/
│       ├── DatabaseSeeder.php
│       ├── UserSeeder.php
│       ├── CourseSeeder.php
│       └── CategorySeeder.php
│
├── routes/
│   └── api.php                 # All API routes
│
├── config/
│   ├── sanctum.php
│   ├── filesystems.php         # S3 config
│   └── services.php            # OpenAI, YouTube API
│
└── tests/
    ├── Feature/
    │   ├── Auth/
    │   ├── Course/
    │   ├── Progress/
    │   └── Assessment/
    └── Unit/
```

## Security Architecture

### RBAC (Role-Based Access Control)
```php
// Middleware registration
Route::middleware(['auth:sanctum', 'role:instructor,admin'])
    ->group(function () { ... });

// Policy example
public function update(User $user, Course $course): bool {
    return $user->id === $course->instructor_id 
        || $user->role === 'admin';
}
```

### Anti-Cheat System (Exam)
- JavaScript activity monitor (copy/paste, tab switch detection)
- Server-side time enforcement (submission blocked after deadline)
- Answer randomization via Fisher-Yates shuffle
- Session-based exam token (one active session per student)
- Activity log stored in `submissions.anti_cheat_log` JSONB

### Rate Limiting
```php
RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(120)->by($request->user()?->id);
});
RateLimiter::for('ai', function (Request $request) {
    return Limit::perMinute(20)->by($request->user()?->id);
});
```

## AI System Design

### Study Plan Generation (OpenAI GPT-4)
```php
class StudyPlanService {
    public function generate(User $student): array {
        $context = [
            'courses' => $student->enrollments()->with('course')->get(),
            'progress' => $student->lectureProgress()->recent(),
            'deadlines' => $student->upcomingDeadlines(),
            'study_history' => $student->activityLogs()->thisWeek(),
            'goal_hours' => $student->studyPlan?->weekly_goal_hours ?? 20,
        ];
        
        $prompt = $this->buildStudyPlanPrompt($context);
        $response = OpenAI::chat()->create([
            'model' => 'gpt-4o',
            'messages' => [['role' => 'user', 'content' => $prompt]],
            'response_format' => ['type' => 'json_object'],
        ]);
        
        return json_decode($response->choices[0]->message->content, true);
    }
}
```

### Inactivity Detection (Scheduled Job)
```php
// Runs every 6 hours via scheduler
class InactivityCheckCommand {
    public function handle() {
        $inactive = User::student()
            ->whereHas('enrollments', fn($q) => $q->active())
            ->where('last_login', '<', now()->subDays(5))
            ->get();
            
        foreach ($inactive as $student) {
            SendInactivityEmailJob::dispatch($student)->onQueue('emails');
        }
    }
}
```

## S3 Storage Architecture

```
dezigncamp-s3-bucket/
├── avatars/
│   └── {user_id}/{timestamp}-{hash}.jpg
├── assignments/
│   └── {course_id}/{assessment_id}/{student_id}/{filename}
├── certificates/
│   └── {user_id}/{course_id}/certificate.pdf
├── course-assets/
│   └── {course_id}/{module_id}/{filename}
└── course-thumbnails/
    └── {course_id}/thumbnail.jpg
```

### S3 Upload Flow
1. Frontend requests pre-signed URL from API (`POST /upload/avatar`)
2. API generates temporary S3 presigned URL (15-minute expiry)
3. Frontend uploads directly to S3 (bypasses server)
4. Frontend sends S3 key to API to update database record
