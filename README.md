# 📅 Event Calendar

A modern, feature-rich event calendar application built with React that provides an intuitive interface for managing your schedule. Create, edit, and organize events with drag-and-drop functionality, recurring events, and smart conflict detection.

## ✨ Features

- **📊 Monthly Calendar View** - Clean, responsive calendar layout with easy month navigation
- **➕ Event Management** - Create, edit, and delete events with a comprehensive form
- **🔄 Recurring Events** - Support for daily, weekly, monthly, and custom recurrence patterns
- **🖱️ Drag & Drop** - Intuitive event rescheduling by dragging events between dates
- **⚠️ Conflict Detection** - Smart warnings for overlapping events at the same time
- **🔍 Search & Filter** - Find events by title/description and filter by category
- **📱 Responsive Design** - Optimized for both desktop and mobile devices
- **💾 Data Persistence** - Automatic saving to localStorage
- **🎨 Category Colors** - Visual organization with color-coded event categories

## 🚀 Demo
   https://sparkly-genie-ce7352.netlify.app/
## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **date-fns** - Powerful date manipulation library
- **react-dnd** - Drag and drop functionality
- **UUID** - Unique identifier generation
- **CSS Grid & Flexbox** - Responsive layouts
- **localStorage** - Client-side data persistence

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/event-calendar.git
   cd event-calendar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Adding Events
1. Click on any calendar day to open the event creation form
2. Fill in event details:
   - **Title** (required)
   - **Date & Time** (required)
   - **Description** (optional)
   - **Category** (Work, Personal, Health, Social, Other)
3. Configure recurrence if needed
4. Click "Add Event" to save

### Managing Events
- **Edit**: Click on any existing event to modify its details
- **Delete**: Use the delete button in the event edit form
- **Reschedule**: Drag and drop events to different dates
- **Search**: Use the search bar to find specific events
- **Filter**: Select categories to view only relevant events

### Event Categories
- 🔵 **Work** - Professional meetings and tasks
- 🟢 **Personal** - Personal appointments and activities
- 🟡 **Health** - Medical appointments and fitness
- 🔴 **Social** - Social events and gatherings
- 🟣 **Other** - Miscellaneous events

## 📁 Project Structure

```
event-calendar/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Calendar/          # Calendar components
│   │   │   ├── Calendar.jsx
│   │   │   ├── CalendarGrid.jsx
│   │   │   ├── CalendarHeader.jsx
│   │   │   └── CalendarDay.jsx
│   │   ├── Events/            # Event management
│   │   │   ├── EventForm.jsx
│   │   │   ├── EventItem.jsx
│   │   │   └── EventModal.jsx
│   │   ├── UI/                # Reusable components
│   │   │   ├── Modal.jsx
│   │   │   └── SearchBar.jsx
│   │   └── Layout/
│   │       └── Header.jsx
│   ├── hooks/                 # Custom React hooks
│   │   ├── useEvents.js
│   │   ├── useLocalStorage.js
│   │   └── useDragAndDrop.js
│   ├── utils/                 # Utility functions
│   │   ├── dateUtils.js
│   │   ├── eventUtils.js
│   │   └── constants.js
│   ├── styles/                # CSS stylesheets
│   │   ├── Calendar.css
│   │   ├── Events.css
│   │   └── Global.css
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner in interactive watch mode
- `npm run build` - Builds the app for production to the `build` folder
- `npm run eject` - **Note: this is a one-way operation. Once you eject, you can't go back!**

## 🌐 Browser Support

This application supports all modern browsers:

| Browser | Version |
|---------|---------|
| Chrome  | Latest  |
| Firefox | Latest  |
| Safari  | Latest  |
| Edge    | Latest  |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. **Fork the repository**
2. **Create your feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🙏 Acknowledgments

- Built with [Create React App](https://github.com/facebook/create-react-app)
- Date handling powered by [date-fns](https://date-fns.org/)
- Drag and drop functionality by [react-dnd](https://react-dnd.github.io/react-dnd/)

## 🐛 Issues

If you encounter any issues or have suggestions, please [create an issue](https://github.com/yourusername/event-calendar/issues) on GitHub.

## 🔮 Future Enhancements

- [ ] Event reminders and notifications
- [ ] Import/export calendar data (iCal format)
- [ ] Multiple calendar views (week, day)
- [ ] Event sharing functionality
- [ ] Integration with external calendar services
- [ ] Dark mode support
- [ ] Keyboard shortcuts
- [ ] Print calendar functionality

---

⭐ If you found this project helpful, please give it a star on GitHub!
