import { KeyInterFont, KeySearchBar, KeyTitleNotifications, KeyTransparentSearch, KeyTweetButton } from "../../../storage-keys";
import BackgroundColorControl from "../controls/BackgroundColorControl";
import SectionLabel from "../ui/SectionLabel";
import SwitchControl from "../ui/SwitchControl";

const InterfaceSection = () => (
  <section className="flex flex-col gap-y-2">
    <SectionLabel htmlFor="user-control-interface">界面</SectionLabel>
    <div id="user-control-interface">
      <form className="flex flex-col items-center justify-between px-4 dark:bg-x-bgTwoDark bg-x-bgTwo rounded-2xl">
        <div className="w-full py-4">
          <div className="flex flex-col gap-y-4">
            <BackgroundColorControl />
            <SwitchControl label="Inter 字体" storageKey={KeyInterFont} />
            <SwitchControl label="搜索栏" storageKey={KeySearchBar} />
            <SwitchControl label="透明搜索栏" storageKey={KeyTransparentSearch} />
            <SwitchControl label="发帖按钮" storageKey={KeyTweetButton} />
            <SwitchControl label="标题栏通知" storageKey={KeyTitleNotifications} />
          </div>
        </div>
      </form>
    </div>
  </section>
);

export default InterfaceSection;
