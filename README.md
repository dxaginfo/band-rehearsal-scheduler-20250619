# Band Rehearsal Scheduler

A comprehensive web application designed to help bands efficiently schedule rehearsals, track attendance, send automated reminders, and optimize rehearsal times based on member availability.

## Features

- **User and Band Management**
  - Create band profiles with member management
  - Role-based permissions (admin, member)
  - User profiles with instrument details

- **Rehearsal Scheduling**
  - Create, edit, and delete rehearsal events
  - Set recurring rehearsal patterns
  - Link rehearsals to venues
  - Associate setlists with rehearsals

- **Availability Tracking**
  - Members indicate availability for proposed times
  - Visual calendar with availability overlays
  - Automated suggestion of optimal rehearsal times

- **Notification System**
  - Automated email/SMS reminders
  - Confirmation requests
  - Schedule change alerts

- **Attendance Tracking**
  - Check-in functionality
  - Historical attendance reporting
  - Member participation metrics

- **Mobile Responsive Design**
  - Fully functional on all device sizes
  - Optimized for on-the-go updates

## Technology Stack

### Frontend
- React.js with TypeScript
- Redux Toolkit for state management
- Material-UI for component library
- FullCalendar.js for calendar views
- Formik with Yup for form handling

### Backend
- Node.js with Express
- RESTful API with OpenAPI documentation
- JWT authentication with social login options
- Prisma ORM

### Database
- PostgreSQL for primary data storage
- Redis for caching and performance

### DevOps
- Docker for containerization
- GitHub Actions for CI/CD
- AWS deployment (EC2/ECS)

## Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v13+)
- Redis
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/dxaginfo/band-rehearsal-scheduler-20250619.git
   cd band-rehearsal-scheduler-20250619
   ```

2. Install dependencies for backend
   ```bash
   cd backend
   npm install
   ```

3. Install dependencies for frontend
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables
   ```bash
   # In backend directory
   cp .env.example .env
   # Edit .env with your database credentials and other settings
   ```

5. Run database migrations
   ```bash
   cd ../backend
   npx prisma migrate dev
   ```

6. Start the development servers
   ```bash
   # In backend directory
   npm run dev
   
   # In another terminal, in frontend directory
   npm start
   ```

7. Access the application at `http://localhost:3000`

## Docker Deployment

1. Build and run using Docker Compose
   ```bash
   docker-compose up -d --build
   ```

2. The application will be available at `http://localhost:8080`

## Database Schema

The application uses a relational database with the following main entities:
- Users
- Bands
- BandMembers
- Venues
- Rehearsals
- Availability
- Attendance
- Songs
- Setlists

For detailed schema information, refer to the [documentation](docs/DATABASE.md).

## API Documentation

The API documentation is available at `/api/docs` when running the server.

## Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- FullCalendar.js for the calendar functionality
- Material-UI for the component library
- All contributors who have helped shape this project