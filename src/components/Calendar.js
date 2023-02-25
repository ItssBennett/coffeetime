// Import statements for necessary packages and assets
import { Fragment, useState } from "react"
import eventimg from "../assets/eventimg.png"
import {
CalendarIcon,
ChevronLeftIcon,
ChevronRightIcon,
EllipsisHorizontalIcon,
MapPinIcon,
} from "@heroicons/react/20/solid"
import { Menu, Transition } from "@headlessui/react"

// Array of weekdays
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// Function to get the number of days in a month given a year and month
function getDaysInMonth(year, month) {
return new Date(year, month, 0).getDate()
}

// Function to generate an array of objects representing each day in a given month
function generateDays(year, month) {
const numDaysInMonth = getDaysInMonth(year, month)
const days = []

// Loop through each day in the month and add to the array of days
for (let i = 1; i <= numDaysInMonth; i++) {
const date = new Date(year, month - 1, i)
const dateString = date.toISOString().split("T")[0]
const isToday = dateString === new Date().toISOString().split("T")[0]
const dayOfWeek = date.toLocaleString("default", { weekday: "short" })
const isCurrentMonth = month === date.getMonth() + 1
days.push({ date: dateString, isCurrentMonth, isToday, dayOfWeek })
}

// Add days from previous month if necessary to fill out first week of current month
const firstDayOfMonth = new Date(year, month - 1, 1)
const firstDayOfWeek = firstDayOfMonth.toLocaleString("default", {
weekday: "short",
})
const startIndex = weekdays.indexOf(firstDayOfWeek)

if (startIndex > 0) {
for (let i = startIndex - 1; i >= 0; i--) {
const date = new Date(year, month - 1, 1 - (startIndex - i))
const dateString = date.toISOString().split("T")[0]
const dayOfWeek = date.toLocaleString("default", { weekday: "short" })
days.unshift({ date: dateString, isCurrentMonth: false, dayOfWeek })
}
}

// Add days from next month if necessary to fill out last week of current month
const endIndex = days.length - 1
const lastDayOfMonth = new Date(year, month - 1, numDaysInMonth)
const lastDayOfWeek = lastDayOfMonth.toLocaleString("default", {
weekday: "short",
})
const endDayOfWeekIndex = weekdays.indexOf(lastDayOfWeek)

if (endDayOfWeekIndex < 6) {
for (let i = endDayOfWeekIndex + 1; i <= 6; i++) {
const date = new Date(
year,
month - 1,
numDaysInMonth + (i - endDayOfWeekIndex)
)
const dateString = date.toISOString().split("T")[0]
const dayOfWeek = date.toLocaleString("default", { weekday: "short" })
days.push({ date: dateString, isCurrentMonth: false, dayOfWeek })
}
}

return days
}

// Function to concatenate classNames
function classNames(...classes) {
return classes.filter(Boolean).join(" ")
}

// Initial state for form inputs
const initialFormState = {
date: "",
time: "",
name: "",
location: ""
};


//setting the state i need within the main calendar component
export default function Calendar() {
  const today = new Date()
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formInputs, setFormInputs] = useState({
    date: "",
    time: "",
    name: "",
    location: "",
  })

  const [meetings, setMeetings] = useState([])

  const [editingMeeting, setEditingMeeting] = useState(null)
  const [editedMeeting, setEditedMeeting] = useState({})


  const days = generateDays(year, month)

  //function to scroll backwards thru months on the calendar
  function handlePrevMonth() {
    setMonth((prevMonth) => prevMonth - 1)
    if (month === 1) {
      setYear((prevYear) => prevYear - 1)
    }
  }

    //function to scroll to the next month on the calendar
  function handleNextMonth() {
    setMonth((prevMonth) => prevMonth + 1)
    if (month === 12) {
      setYear((prevYear) => prevYear + 1)
    }
  }

  //setting state to true
  function handleAddEventClick() {
    setIsFormOpen(true)
  }

  //setting state to false
  function handleFormClose() {
    setIsFormOpen(false)
  }

  //attached as an onclick
  //allows the end user to  submit the form for an added meeting
  function handleSubmit(event) {
    event.preventDefault()
    const newMeeting = {
      id: meetings.length + 1,
      date: formInputs.date,
      time: formInputs.time,
      datetime: formInputs.date + "T" + formInputs.time,
      name: formInputs.name,
      location: formInputs.location,
    }
    setMeetings([...meetings, newMeeting])
    setFormInputs({
      date: "",
      time: "",
      name: "",
      location: "",
    })
    setIsFormOpen(false)
  }


  function addMeeting(newMeeting) {
    setMeetings([...meetings, newMeeting])
  }


  function handleDelete(id) {
    setMeetings(meetings.filter(meeting => meeting.id !== id));
  }


  function handleEdit(id) {
    const meeting = meetings.find((m) => m.id === id)
    setEditedMeeting({ ...meeting })
    setEditingMeeting(meeting)
  }

  //mapping over meetings array and replacing the data from the edited form data
  const handleEditSubmit = (event) => {
    event.preventDefault();
    setMeetings(
      meetings.map((meeting) =>
        meeting.id === editedMeeting.id ? editedMeeting : meeting
      )
    );
    setEditingMeeting(false);
    setEditedMeeting(initialFormState);
  };
  
  


  return (
    <div>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
          <div className="flex items-center text-gray-900">
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              onClick={handlePrevMonth}
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex-auto font-semibold">
              {new Date(year, month - 1).toLocaleString("default", {
                month: "long",
              })}
            </div>
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              onClick={handleNextMonth}
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          {/* setting weekdays by mapping over weekday array */}
          <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
            {weekdays.map((weekday) => (
              <div key={weekday}>{weekday}</div>
            ))}
          </div>

          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200 ">
            {days.map((day, dayIdx) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  "py-9 hover:bg-gray-100 focus:z-10",
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                  (day.isSelected || day.isToday) && "font-semibold",
                  day.isSelected && "text-white",
                  !day.isSelected &&
                    day.isCurrentMonth &&
                    !day.isToday &&
                    "text-gray-900",
                  !day.isSelected &&
                    !day.isCurrentMonth &&
                    !day.isToday &&
                    "text-gray-400",
                  day.isToday && !day.isSelected && "text-indigo-600",
                  dayIdx === 0 && "rounded-tl-lg",
                  dayIdx === 6 && "rounded-tr-lg",
                  dayIdx === days.length - 7 && "rounded-bl-lg",
                  dayIdx === days.length - 1 && "rounded-br-lg"
                )}
              >
                {/* setting current day */}
                <time
                  dateTime={day.date}
                  className={classNames(
                    "mx-auto flex h-1.5 w-1.5 items-center justify-center rounded-full",
                    day.isSelected && day.isToday && "bg-indigo-600",
                    day.isSelected && !day.isToday && "bg-gray-900"
                  )}
                >
                  {day.date.split("-").pop().replace(/^0/, "")}
                </time>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="mt-8 w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleAddEventClick} // add event listener to button
          >
            Add Task
          </button>

          {/* the code for the edit form to pop up in the same place as the orignal add meeting form. attached proper onclicks to proper buttons and prefilling the form with the previously submitted data */}          
          {editingMeeting && (
  <form onSubmit={handleEditSubmit}>
    <label htmlFor="edit-date" className="block font-medium text-gray-700">
      Date
    </label>
    <input
      type="date"
      id="edit-date"
      name="edit-date"
      value={editedMeeting.date}
      onChange={(event) =>
        setEditedMeeting({ ...editedMeeting, date: event.target.value })
      }
      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center"
    />
    <label htmlFor="edit-time" className="block font-medium text-gray-700">
      Time
    </label>
    <input
      type="time"
      id="edit-time"
      name="edit-time"
      value={editedMeeting.time}
      onChange={(event) =>
        setEditedMeeting({ ...editedMeeting, time: event.target.value })
      }
      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center"
    />
    <label htmlFor="edit-name" className="block font-medium text-gray-700">
      Name
    </label>
    <input
      type="text"
      id="edit-name"
      name="edit-name"
      value={editedMeeting.name}
      onChange={(event) =>
        setEditedMeeting({ ...editedMeeting, name: event.target.value })
      }
      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center"
    />
    <label
      htmlFor="edit-location"
      className="block font-medium text-gray-700"
    >
      Location
    </label>
    <input
      type="text"
      id="edit-location"
      name="edit-location"
      value={editedMeeting.location}
      onChange={(event) =>
        setEditedMeeting({ ...editedMeeting, location: event.target.value })
      }
      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center"
    />
    <div className="mt-6">
      <button
        type="submit"
        className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save
      </button>
    </div>
  </form>
)}
        {/* the first form to open. this will allow the end user to submit a 'task' and add it to the meetings array to be rendered */}
          {isFormOpen && (
            <form onSubmit={handleSubmit}>
              <label htmlFor="date" className="block font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formInputs.date}
                onChange={(event) =>
                  setFormInputs({ ...formInputs, date: event.target.value })
                }
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center"
              />
              <label htmlFor="time" className="block font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formInputs.time}
                onChange={(event) =>
                  setFormInputs({ ...formInputs, time: event.target.value })
                }
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center"
              />
              <label htmlFor="name" className="block font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formInputs.name}
                onChange={(event) =>
                  setFormInputs({ ...formInputs, name: event.target.value })
                }
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center"
              />
              <label
                htmlFor="location"
                className="block font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formInputs.location}
                onChange={(event) =>
                  setFormInputs({ ...formInputs, location: event.target.value })
                }
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center"
              />
              <div className="mt-6">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-4 py-2 mr-2 font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={handleFormClose}
                  className="inline-flex items-center justify-center px-4 py-2 font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

                {/* list to hold all submitted meetings */}
        <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
          <img
            src={eventimg}
            alt="Event Image"
            className="mt-4 mx-auto h-32 w-32 sm:h-48 sm:w-48 md:h-64 md:w-64 lg:h-80 lg:w-80 xl:h-96 xl:w-96"
          />
          {meetings.map((meeting) => (
            <li
              key={meeting.id}
              className="relative flex space-x-6 py-6 xl:static"
            >
              <div className="flex-auto">
                <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
                  {meeting.name}
                </h3>
                <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                  <div className="flex items-start space-x-3">
                    <dt className="mt-0.5">
                      <span className="sr-only">Date</span>
                      <CalendarIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>
                      <time dateTime={meeting.datetime}>
                        {meeting.date} at {meeting.time}
                      </time>
                    </dd>
                  </div>
                  <div className="mt-2 flex items-start space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                    <dt className="mt-0.5">
                      <span className="sr-only">Location</span>
                      <MapPinIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>{meeting.location}</dd>
                  </div>
                </dl>
                
              </div>
              
              <Menu
  as="div"
  className="absolute top-6 right-0 xl:relative xl:top-auto xl:right-auto xl:self-center"
>

    {/* dropdown menu options with proper onclicks for edit and delete options */}
  <div>
    <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
      <span className="sr-only">Open options</span>
      <EllipsisHorizontalIcon
        className="h-5 w-5"
        aria-hidden="true"
      />
    </Menu.Button>
  </div>

  <Transition
    as={Fragment}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div className="py-1">
        <Menu.Item>
          {({ active }) => (
            <button
              type="button"
              className={classNames(
                active
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700",
                "block w-full text-left px-4 py-2 text-sm"
              )}
              onClick={() => handleEdit(meeting.id)}
            >
              Edit
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button 
            onClick={() => handleDelete(meeting.id)}
              type="button"
              className={classNames(
                active
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700",
                "block w-full text-left px-4 py-2 text-sm"
              )}
            >
              Delete
            </button>
          )}
        </Menu.Item>
      </div>
    </Menu.Items>
  </Transition>
</Menu>


            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}