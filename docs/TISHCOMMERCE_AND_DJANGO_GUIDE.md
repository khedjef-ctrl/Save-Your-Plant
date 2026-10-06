# Self-Hosted Digital Commerce & Email Infrastructure Guide
## دليل التجارة الرقمية والاستضافة الذاتية لنظام "Save Your Plant"

This document explains how to deploy open-source self-hosted alternatives for digital product checkout (TishCommerce) and automated email drip courses (django-email-learning).

---

## 1. TishCommerce: Database-Free Self-Hosted Checkout Alternative
**بديل سترايب الخالي من قواعد البيانات: TishCommerce**

TishCommerce is an open-source, minimalist digital commerce engine built with Next.js that operates without an external database. It uses flat files or Git commits to record orders and automatically issues signed download URLs for digital assets.

### Architecture Overview:
```
┌────────────────────────────────┐         ┌───────────────────────────────┐
│ React Frontend (SaveYourPlant) │ ──────> │ TishCommerce Service (Next.js)│
│ Landing page & PDF Studio      │         │ Port 3001 or Subdomain        │
└────────────────────────────────┘         └───────────────────────────────┘
                                                           │
                                                           ▼
                                           ┌───────────────────────────────┐
                                           │ Digital File Vault (PDF / ZIP)│
                                           │ Issues Time-Limited Downloads │
                                           └───────────────────────────────┘
```

### Deployment Steps:
1. **Clone TishCommerce**:
   ```bash
   git clone https://github.com/tishcommerce/tishcommerce.git syp-store
   cd syp-store
   npm install
   ```

2. **Configure Products (`config/products.json`)**:
   ```json
   [
     {
       "id": "starter",
       "name": "Starter Rescue Kit",
       "price": 12,
       "currency": "USD",
       "files": ["SaveYourPlant_60Page_Guide.pdf", "FixCards_20_Deck.pdf"]
     },
     {
       "id": "pro",
       "name": "Pro Rescue System",
       "price": 19,
       "currency": "USD",
       "files": ["SaveYourPlant_Complete_Kit.zip", "Notion_Workspace_Link.txt"]
     }
   ]
   ```

3. **Link to React Frontend**:
   In `src/components/CheckoutButton.tsx`, point your checkout handler to your TishCommerce URL:
   ```typescript
   window.location.href = `https://store.saveyourplant.org/checkout?product=${tierId}&email=${encodeURIComponent(customerEmail)}`;
   ```

---

## 2. django-email-learning: Automated 7-Day Email Drip Backend
**محرك الدورة البريدية الذاتي: django-email-learning**

django-email-learning is a production-grade, open-source Django package for scheduling and delivering structured multi-day email courses.

### Architecture Overview:
```
┌─────────────────────────────────┐   POST /api/subscribe/   ┌───────────────────────────────┐
│ NewsletterSignup.tsx Component  │ ───────────────────────> │ Django Email Learning Service │
│ (Collects Name, Email, Lang)    │                          │ (Celery + Redis Scheduler)    │
└─────────────────────────────────┘                          └───────────────────────────────┘
                                                                             │
                                                                             ▼ (SMTP / Amazon SES)
                                                             ┌───────────────────────────────┐
                                                             │ Daily 7:00 AM Emails (Days 1-7│
                                                             └───────────────────────────────┘
```

### Quickstart Setup:
1. **Install Django & django-email-learning**:
   ```bash
   pip install django django-email-learning celery redis
   ```

2. **Register Course & Schedule (`courses.py`)**:
   ```python
   from email_learning.models import Course, Lesson

   course = Course.objects.create(
       title="7-Day Plant Rescue Trajectory",
       slug="save-your-plant-7days"
   )
   # Lessons are mapped directly from src/data/emailCourse.ts
   ```

3. **Expose REST API Endpoint (`views.py`)**:
   ```python
   from rest_framework.decorators import api_view
   from rest_framework.response import Response
   from email_learning.services import enroll_student

   @api_view(['POST'])
   def enroll(request):
       email = request.data.get('email')
       name = request.data.get('name')
       enroll_student(course_slug="save-your-plant-7days", email=email, name=name)
       return Response({"status": "enrolled", "day": 1})
   ```

4. **Connect React Frontend**:
   In `src/components/NewsletterSignup.tsx`:
   ```typescript
   await fetch('https://api.saveyourplant.org/api/subscribe/', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ email, name, language: lang })
   });
   ```

---

## 3. AppFlowy Cloud & Database Sync
**ربط قاعدة بيانات النباتات مع AppFlowy**

1. Our React tracker (`src/components/PlantTracker.tsx`) uses `localStorage` as the instant client-side persistence layer with one-click `.csv` export.
2. To synchronize with an AppFlowy Cloud instance, deploy the AppFlowy docker image:
   ```bash
   docker run -d -p 8000:8000 appflowy/appflowy-cloud:latest
   ```
3. Use the AppFlowy REST API to stream row mutations directly from the tracker's `handleAddPlant` and `handleWaterPlant` hooks.
