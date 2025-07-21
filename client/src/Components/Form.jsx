function Form({ entries = [], button, submitHandler }) {
  return (
    <form onSubmit={submitHandler} className="">
      {entries.map((entry, i) => (
        <div className="flex flex-col my-4" key={i}>
          <label className="text-lg text-gray-500" htmlFor={entry.input}>
            {entry.label}
          </label>
          <input
            className="border-b-1 outline-none px-2 py-1 w-full placeholder:italic placeholder:text-sm text-sm"
            placeholder="Enter your name"
            type={entry.type}
            name={entry.input}
            id={entry.input}
          />
        </div>
      ))}
      <button
        className="text-white text-lg py-2 rounded-lg bg-blue-500 w-full cursor-pointer focus:bg-blue-300"
        type="submit"
      >
        {button}
      </button>
    </form>
  );
}

export default Form;
