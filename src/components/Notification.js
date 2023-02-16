const Notification = ({ notification }) => {
  return (
    <div className="noti-card">
      <p
        style={{
          color: "#434242",
          fontSize: "1rem",
          fontWeight: "400",
          fontStyle: "italic",
        }}
      >
        Channel Name
      </p>
      <p>{notification.app}</p>
      <div className="noti-text">
        <div className="noti-title">
          <p
            style={{
              color: "#434242",
              fontSize: "1rem",
              fontWeight: "400",
              fontStyle: "italic",
            }}
          >
            Title
          </p>

          <p>{notification.notification.title}</p>
        </div>
        <div className="noti-desc">
          <p
            style={{
              color: "#434242",
              fontSize: "1rem",
              fontWeight: "400",
              fontStyle: "italic",
            }}
          >
            Message
          </p>
          <p>{notification.notification.body}</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
