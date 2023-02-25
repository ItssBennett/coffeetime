import {  ServerIcon, CalendarDaysIcon, CloudIcon, NewspaperIcon } from '@heroicons/react/20/solid'
import coffeeImg from '../assets/friends.png';
import './Feature.css'


//Tailwind "features" section.
//setting the features with the description and icons
const features = [
  {
    name: 'View your calendar and tasks.',
    description:
      'Monthly calendar view, upcoming tasks for the day and more.',
    icon: CalendarDaysIcon,
  },
  {
    name: 'Get your local weather forecast.',
    description: 'Local weather forecast, and custom locations.',
    icon: CloudIcon,
  },
  {
    name: 'View top & trending news articles.',
    description: 'Top news articles from top companies.',
    icon: NewspaperIcon,
  },
]

//base of component with tailwind styling
export default function Feature() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">Coffeetime</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A better start to your day</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Coffeetime is your personal app. See everything you need
                to start your day, all in less time than it takes to drink 
                a cup of coffee!
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {/* mapping over features array to render each feature */}
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon className="absolute top-1 left-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
             src={coffeeImg}
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  )
}
