# Database Schema Documentation

This document outlines the database schema used in the Band Rehearsal Scheduler application.

## Entity Relationship Diagram

```
Users ──┐
        ├── BandMembers ─── Bands
        │                     │
        ├── Availability ──── Rehearsals ── RehearsalSetlists ── Setlists ── SetlistSongs ── Songs
        │                     │
        └── Attendance ────── │
                              │
                         Venues
```

## Tables

### Users

Stores user account information.

| Column            | Type          | Constraints                    | Description                           |
|-------------------|---------------|--------------------------------|---------------------------------------|
| id                | UUID          | PRIMARY KEY                    | Unique identifier                     |
| email             | VARCHAR(255)  | UNIQUE, NOT NULL               | User's email address                  |
| password_hash     | VARCHAR(255)  |                                | Hashed password                       |
| first_name        | VARCHAR(100)  | NOT NULL                       | User's first name                     |
| last_name         | VARCHAR(100)  | NOT NULL                       | User's last name                      |
| phone             | VARCHAR(20)   |                                | Contact phone number                  |
| instrument        | VARCHAR(100)  |                                | Primary instrument played             |
| profile_image_url | VARCHAR(255)  |                                | URL to profile image                  |
| created_at        | TIMESTAMP     | DEFAULT NOW()                  | Record creation timestamp             |
| updated_at        | TIMESTAMP     | DEFAULT NOW()                  | Record update timestamp               |

### Bands

Stores information about bands.

| Column            | Type          | Constraints                    | Description                           |
|-------------------|---------------|--------------------------------|---------------------------------------|
| id                | UUID          | PRIMARY KEY                    | Unique identifier                     |
| name              | VARCHAR(255)  | NOT NULL                       | Band name                             |
| description       | TEXT          |                                | Band description                      |
| logo_url          | VARCHAR(255)  |                                | URL to band logo                      |
| created_by        | UUID          | REFERENCES users(id)           | User who created the band             |
| created_at        | TIMESTAMP     | DEFAULT NOW()                  | Record creation timestamp             |
| updated_at        | TIMESTAMP     | DEFAULT NOW()                  | Record update timestamp               |

### BandMembers

Junction table linking users to bands with role information.

| Column            | Type          | Constraints                                | Description                           |
|-------------------|---------------|-------------------------------------------|---------------------------------------|
| id                | UUID          | PRIMARY KEY                               | Unique identifier                     |
| band_id           | UUID          | REFERENCES bands(id) ON DELETE CASCADE    | Band reference                        |
| user_id           | UUID          | REFERENCES users(id) ON DELETE CASCADE    | User reference                        |
| role              | VARCHAR(50)   | NOT NULL                                  | Role in band (admin, member)          |
| joined_at         | TIMESTAMP     | DEFAULT NOW()                             | When user joined the band             |
|                   |               | UNIQUE (band_id, user_id)                 | Prevents duplicate membership         |

### Venues

Stores information about rehearsal venues.

| Column            | Type          | Constraints                    | Description                           |
|-------------------|---------------|--------------------------------|---------------------------------------|
| id                | UUID          | PRIMARY KEY                    | Unique identifier                     |
| name              | VARCHAR(255)  | NOT NULL                       | Venue name                            |
| address           | TEXT          |                                | Street address                        |
| city              | VARCHAR(100)  |                                | City                                  |
| state             | VARCHAR(100)  |                                | State/Province                        |
| postal_code       | VARCHAR(20)   |                                | Postal/ZIP code                       |
| country           | VARCHAR(100)  |                                | Country                               |
| contact_name      | VARCHAR(255)  |                                | Contact person name                   |
| contact_phone     | VARCHAR(20)   |                                | Contact phone number                  |
| contact_email     | VARCHAR(255)  |                                | Contact email                         |
| notes             | TEXT          |                                | Additional notes                      |
| created_at        | TIMESTAMP     | DEFAULT NOW()                  | Record creation timestamp             |
| updated_at        | TIMESTAMP     | DEFAULT NOW()                  | Record update timestamp               |

### Rehearsals

Stores rehearsal event information.

| Column            | Type          | Constraints                                | Description                           |
|-------------------|---------------|-------------------------------------------|---------------------------------------|
| id                | UUID          | PRIMARY KEY                               | Unique identifier                     |
| band_id           | UUID          | REFERENCES bands(id) ON DELETE CASCADE    | Associated band                       |
| venue_id          | UUID          | REFERENCES venues(id)                     | Rehearsal location                    |
| title             | VARCHAR(255)  | NOT NULL                                  | Rehearsal title                       |
| description       | TEXT          |                                           | Rehearsal description                 |
| start_time        | TIMESTAMP     | NOT NULL                                  | Start time                            |
| end_time          | TIMESTAMP     | NOT NULL                                  | End time                              |
| is_recurring      | BOOLEAN       | DEFAULT FALSE                             | Whether this is recurring             |
| recurrence_pattern| TEXT          |                                           | Defines how it recurs                 |
| created_by        | UUID          | REFERENCES users(id)                      | User who created the rehearsal        |
| created_at        | TIMESTAMP     | DEFAULT NOW()                             | Record creation timestamp             |
| updated_at        | TIMESTAMP     | DEFAULT NOW()                             | Record update timestamp               |

### Availability

Tracks member availability for rehearsals.

| Column            | Type          | Constraints                                | Description                           |
|-------------------|---------------|-------------------------------------------|---------------------------------------|
| id                | UUID          | PRIMARY KEY                               | Unique identifier                     |
| rehearsal_id      | UUID          | REFERENCES rehearsals(id) ON DELETE CASCADE| Associated rehearsal                  |
| user_id           | UUID          | REFERENCES users(id) ON DELETE CASCADE    | User providing availability           |
| status            | VARCHAR(50)   | NOT NULL                                  | Available, unavailable, tentative     |
| notes             | TEXT          |                                           | Additional notes                      |
| responded_at      | TIMESTAMP     | DEFAULT NOW()                             | When response was recorded            |
|                   |               | UNIQUE (rehearsal_id, user_id)            | One response per user per rehearsal   |

### Attendance

Records actual attendance at rehearsals.

| Column            | Type          | Constraints                                | Description                           |
|-------------------|---------------|-------------------------------------------|---------------------------------------|
| id                | UUID          | PRIMARY KEY                               | Unique identifier                     |
| rehearsal_id      | UUID          | REFERENCES rehearsals(id) ON DELETE CASCADE| Associated rehearsal                  |
| user_id           | UUID          | REFERENCES users(id) ON DELETE CASCADE    | User whose attendance is recorded     |
| status            | VARCHAR(50)   | NOT NULL                                  | Present, absent, late                 |
| notes             | TEXT          |                                           | Additional notes                      |
| recorded_by       | UUID          | REFERENCES users(id)                      | User who recorded attendance          |
| recorded_at       | TIMESTAMP     | DEFAULT NOW()                             | When attendance was recorded          |
|                   |               | UNIQUE (rehearsal_id, user_id)            | One attendance record per rehearsal   |

### Songs

Stores information about songs.

| Column            | Type          | Constraints                    | Description                           |
|-------------------|---------------|--------------------------------|---------------------------------------|
| id                | UUID          | PRIMARY KEY                    | Unique identifier                     |
| title             | VARCHAR(255)  | NOT NULL                       | Song title                            |
| artist            | VARCHAR(255)  |                                | Original artist                       |
| duration          | INTEGER       |                                | Duration in seconds                   |
| notes             | TEXT          |                                | Additional notes                      |
| created_by        | UUID          | REFERENCES users(id)           | User who created the song             |
| created_at        | TIMESTAMP     | DEFAULT NOW()                  | Record creation timestamp             |
| updated_at        | TIMESTAMP     | DEFAULT NOW()                  | Record update timestamp               |

### Setlists

Stores setlist information.

| Column            | Type          | Constraints                                | Description                           |
|-------------------|---------------|-------------------------------------------|---------------------------------------|
| id                | UUID          | PRIMARY KEY                               | Unique identifier                     |
| name              | VARCHAR(255)  | NOT NULL                                  | Setlist name                          |
| band_id           | UUID          | REFERENCES bands(id) ON DELETE CASCADE    | Associated band                       |
| created_by        | UUID          | REFERENCES users(id)                      | User who created the setlist          |
| created_at        | TIMESTAMP     | DEFAULT NOW()                             | Record creation timestamp             |
| updated_at        | TIMESTAMP     | DEFAULT NOW()                             | Record update timestamp               |

### SetlistSongs

Junction table linking songs to setlists with position information.

| Column            | Type          | Constraints                                | Description                           |
|-------------------|---------------|-------------------------------------------|---------------------------------------|
| id                | UUID          | PRIMARY KEY                               | Unique identifier                     |
| setlist_id        | UUID          | REFERENCES setlists(id) ON DELETE CASCADE | Associated setlist                    |
| song_id           | UUID          | REFERENCES songs(id) ON DELETE CASCADE    | Associated song                       |
| position          | INTEGER       | NOT NULL                                  | Position in setlist                   |
| notes             | TEXT          |                                           | Performance notes                     |
|                   |               | UNIQUE (setlist_id, song_id)              | Prevents duplicate songs in setlist   |

### RehearsalSetlists

Junction table linking rehearsals to setlists.

| Column            | Type          | Constraints                                | Description                           |
|-------------------|---------------|-------------------------------------------|---------------------------------------|
| rehearsal_id      | UUID          | REFERENCES rehearsals(id) ON DELETE CASCADE| Associated rehearsal                  |
| setlist_id        | UUID          | REFERENCES setlists(id) ON DELETE CASCADE | Associated setlist                    |
|                   |               | PRIMARY KEY (rehearsal_id, setlist_id)    | Composite primary key                 |

### Notifications

Stores notification messages for users.

| Column            | Type          | Constraints                                | Description                           |
|-------------------|---------------|-------------------------------------------|---------------------------------------|
| id                | UUID          | PRIMARY KEY                               | Unique identifier                     |
| user_id           | UUID          | REFERENCES users(id) ON DELETE CASCADE    | User to notify                        |
| rehearsal_id      | UUID          | REFERENCES rehearsals(id) ON DELETE CASCADE| Associated rehearsal                  |
| type              | VARCHAR(50)   | NOT NULL                                  | Type: reminder, change, cancellation  |
| message           | TEXT          | NOT NULL                                  | Notification content                  |
| is_read           | BOOLEAN       | DEFAULT FALSE                             | Whether notification was read         |
| created_at        | TIMESTAMP     | DEFAULT NOW()                             | Notification creation timestamp       |

## Indexes

The following indexes should be created to optimize query performance:

- `users`: Index on `email`
- `band_members`: Indexes on `band_id` and `user_id`
- `rehearsals`: Indexes on `band_id`, `venue_id`, `start_time`
- `availability`: Indexes on `rehearsal_id`, `user_id`
- `attendance`: Indexes on `rehearsal_id`, `user_id`
- `setlist_songs`: Index on `setlist_id`
- `rehearsal_setlists`: Indexes on both columns
- `notifications`: Indexes on `user_id`, `is_read`

## Foreign Key Relationships

All foreign key relationships use `ON DELETE CASCADE` where appropriate to maintain referential integrity. This ensures that when a parent record is deleted, all related child records are also deleted to prevent orphaned data.

## Data Types

- `UUID` is used for all primary and foreign keys to provide globally unique identifiers
- `VARCHAR` with appropriate length limits for text with known maximum size
- `TEXT` for variable-length text without a known maximum size
- `TIMESTAMP` for date/time values
- `BOOLEAN` for true/false values
- `INTEGER` for whole numbers