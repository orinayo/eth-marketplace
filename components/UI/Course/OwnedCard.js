import Image from "next/image";

const STATE_COLORS = {
  purchased: {
    bgColor: "bg-indigo-200",
    textColor: "text-indigo-700",
  },
  activated: {
    bgColor: "bg-green-200",
    textColor: "text-green-700",
  },
  deactivated: {
    bgColor: "bg-red-200",
    textColor: "text-red-700",
  },
};

export default function OwnedCourseCard({
  children,
  course: { title, price, ownedCourseId, proof, coverImage, state },
}) {
  const { bgColor, textColor } = STATE_COLORS[state];
  return (
    <div className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">
      <div className="block sm:flex">
        <div className="flex-1">
          <div className="h-72 sm:h-full next-image-wrapper">
            <Image
              className="object-cover"
              src={coverImage}
              width="45"
              height="45"
              layout="responsive"
              alt={title}
            />
          </div>
        </div>
        <div className="flex-4">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              <span className="mr-2">{title}</span>
              <span
                className={`text-xs ${textColor} ${bgColor} rounded-full p-2`}
              >
                {state}
              </span>
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{price} ETH</p>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Course ID</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {ownedCourseId}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Proof</dt>
                <dd className="mt-1 text-sm break-words text-gray-900 sm:mt-0 sm:col-span-2">
                  {proof}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:px-6">{children}</div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
