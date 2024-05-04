import {assets} from "../../utils/assets";
import "./AppDownload.css";

const AppDownload = () => {
  return (
    <section className="app-download" id="app-download">
      <p>
        For Better Experience Download <br /> Foodie App
      </p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="playstore-app" />
        <img src={assets.app_store} alt="playstore-app" />
      </div>
    </section>
  );
};

export default AppDownload;
