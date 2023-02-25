
//User review section. pretty easy to follow.
export default function Reviews() {
    return (
      <section className="relative isolate overflow-hidden bg-white py-24 px-6 sm:py-32 lg:px-8">
        <div className="bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] absolute inset-0 -z-10 opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <h1 className="text-center text-lg font-semibold leading-8 text-gray-900">
            Testimonials:
          </h1>
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>
                "Coffetime makes my mornings so much easier. I get everything
                i need to start my morning all with one app!"
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <img
                className="mx-auto h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1675796479022-1a0ac4977925?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-900">Herb D.</div>
                <svg viewBox="0 0 2 2" width={3} height={3} aria-hidden="true" className="fill-gray-900">
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <div className="text-gray-600">Verified User</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    )
  }
  