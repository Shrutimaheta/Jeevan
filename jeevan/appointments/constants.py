"""Shared booking rules so forms, models and services agree."""

from datetime import time

BUSINESS_HOURS_START = time(8, 0)   # 8:00 AM
BUSINESS_HOURS_END = time(18, 0)    # 6:00 PM
BUSINESS_HOURS_MESSAGE = "Appointment time must be between 8:00 AM and 6:00 PM."

SLOT_MINUTES = 15
SLOT_MESSAGE = "Appointments start on the quarter hour (e.g. 10:00, 10:15, 10:30, 10:45)."

MAX_DAYS_AHEAD = 180
