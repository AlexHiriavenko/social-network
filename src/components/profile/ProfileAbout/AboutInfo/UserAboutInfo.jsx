import styles from "./aboutInfo.module.scss";

export function UserAboutInfo({
  company,
  position,
  workNow,
  timeFrom,
  timeTo,
}) {
  return (
    <>
      <div style={{width: "100%"}} >
        <p className={styles.about_info__text}>
          {position} at {company}
        </p>
        <p className={styles.about_info__text}>
          {timeFrom} to {workNow ? "present" : timeTo}
        </p>
      </div>
    </>
  );
}
