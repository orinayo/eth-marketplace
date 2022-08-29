import Image from "next/image";

export default function CourseList({ courses }) {
  return (
    <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      {courses.map(({ id, coverImage, title, type, description }) => (
        <div
          key={id}
          className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
        >
          <div className="flex h-full">
            <div className="flex h-full">
              <Image
                className="object-cover"
                src={coverImage}
                layout="fixed"
                width="200"
                height="230"
                alt={title}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {type}
              </div>
              <a
                href="#"
                className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
              >
                {title}
              </a>
              <p className="mt-2 text-gray-500">{description}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
