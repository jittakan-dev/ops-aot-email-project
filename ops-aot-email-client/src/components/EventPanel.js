const EventPanel = (props) => {
  return (
    <div className="flex flex-col w-full">
      <label className="w-fit self-center py-4 mb-6 font-bold text-2xl text-center text-gray-600 border-b-4 border-slate-600">
        {props.eventDateSelected} Events
      </label>
      {props.eventDetail && props.eventDetail.length > 0 ? (
        <>
          <div className="w-full p-6 mb-6 font-semibold text-2xl text-right bg-slate-400">
            <span className="text-xl">Sender :</span>
          </div>
          {props.eventDetail.map((event, index) => {
            const bgColor = index % 2 === 0 ? "bg-white" : "bg-slate-500";
            const textColor = index % 2 === 0 ? "text-gray-700" : "text-white";
            return (
              <div className="w-full h-auto" key={index}>
                <div
                  className={`flex flex-row w-fit space-x-6 p-6 text-2xl bg-slate-800 text-white`}
                >
                  {index + 1}
                </div>
                <div
                  className={`flex flex-row w-full space-x-6 py-6 ${bgColor} ${textColor}`}
                >
                  <p className="pl-6">
                    <span className="pr-2 font-semibold">Receiver :</span>
                    {event.email}
                  </p>
                  <p className="pl-6">
                    <span className="pr-2 font-semibold">Date :</span>
                    {event.dateTime.substring(0, event.dateTime.indexOf("T"))}
                  </p>
                  <p className="pl-6">
                    <span className="pr-2 font-semibold">Time :</span>
                    {event.dateTime.split("T")[1]}
                  </p>
                </div>
                <div
                  className={`flex flex-row w-full space-x-6 py-6 pl-6 ${bgColor} ${textColor} border-t-2 border-slate-400`}
                >
                  <span className="pr-2 font-semibold">Subject :</span>
                  {event.subject}
                </div>
                <div
                  className={`flex flex-row w-full space-x-6 py-6 pl-6 ${bgColor} ${textColor} border-t-2 border-slate-400`}
                >
                  <span className="pr-2 font-semibold">Message :</span>
                </div>
                <div
                  className={`flex flex-row w-full space-x-6 pl-12 pb-6 ${bgColor} ${textColor}`}
                >
                  {event.body}
                </div>
                <div
                  className={`flex flex-row w-full space-x-6 p-6 mb-6 ${bgColor} ${textColor} border-t-2 border-slate-400`}
                ></div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="w-full text-center p-6 mb-6 font-semibold text-2xl bg-white">
          <span className="text-xl">"No event schedule"</span>
        </div>
      )}
    </div>
  );
};

export default EventPanel;
