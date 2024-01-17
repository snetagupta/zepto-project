import React, { useState } from "react";
import usersData from "./userData";

const Home = () => {
  const [users, setUsers] = useState(usersData);
  const [selected, setSelected] = useState([]);
  const [val, setVal] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleSelectUser = (user) => {
    setSelected((prev) => [...prev, user]);

    const remainUsers = users.filter((item) => item.id !== user.id);
    setUsers(remainUsers);
    setVal("");
  };

  const handleRemoveUser = (user) => {
    const remainUsers = selected.filter((item) => item.id !== user.id);
    setSelected(remainUsers);
    setUsers((prev) => [...prev, user]);
  };

  return (
    <main className="grid place-items-center my-8 w-full max-w-3xl mx-auto">
      <article className="w-full">
        <h1 className="text-center mb-10 text-blue-600">Pick Users</h1>

        <section>
          <div>
            <ul className="flex items-center flex-wrap gap-2 w-full border-b-2 border-b-blue-800">
              {selected.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center gap-1 px-2 py-1 border bg-gray-100 rounded-full mb-1"
                >
                  <img
                    src={user.src}
                    alt={user.name}
                    className="w-5 aspect-square rounded-full"
                  />

                  <span className="text-xs">{user.name}</span>
                  <button
                    onClick={() => handleRemoveUser(user)}
                    className="ml-1"
                  >
                    &#x2715;
                  </button>
                </li>
              ))}
              <li>
                <div className="relative">
                  <input
                    type="text"
                    value={val}
                    onFocusCapture={() => setIsVisible(true)}
                    onChange={(e) => setVal(e.target.value)}
                    placeholder="Add new user"
                    className="min-w-full outline-none"
                  />

                  {isVisible && users.length > 0 && (
                    <div className="border py-4 w-full min-w-max absolute left-0 top-6 bg-white">
                      <ul className="max-h-60 overflow-y-scroll">
                        {users
                          .filter((user) =>
                            user.name.toLowerCase().includes(val.toLowerCase())
                          )
                          .map((user) => (
                            <li
                              key={user.id}
                              onClick={() => handleSelectUser(user)}
                              className="flex items-center gap-2 hover:bg-slate-100 py-3 px-6 cursor-pointer"
                            >
                              <img
                                src={user.src}
                                alt={user.name}
                                className="w-6 aspect-square rounded-full"
                              />
                              <h2>{user.name}</h2>
                              <span className="ml-2 text-gray-500">
                                {user.email}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </section>
      </article>
    </main>
  );
};

export default Home;
