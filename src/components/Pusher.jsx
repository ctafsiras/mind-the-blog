"use client"

import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import toast from "react-hot-toast";

const pusher = new Pusher("0548ad9171024132112b", {
  cluster: "mt1",
});

//ignore ts error all command

// @ts-ignore

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  Notification.requestPermission().then(function (result) {
    if (result === "denied") toast.error(result, { id: "denied" });
    else if (result === "granted") toast.success(result, { id: "granted" });

  });
  useEffect(() => {

    const channel = pusher.subscribe("my-channel");

    channel.bind("my-event", (data) => {

      new Notification(data);
      toast.success(data, {
        duration: 4000,

      });
      setNotifications([...notifications, data]);
    });

    return () => {
      pusher.unsubscribe("my-channel");
    };
  }, [notifications]);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, i) => (
          <li key={i}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
