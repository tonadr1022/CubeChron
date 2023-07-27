import { SettingQueryDocument } from "@/__generated__/graphql";
import { useQuery } from "@apollo/client";
import clsx from "clsx";
import { useUpdateSetting } from "@/hooks/settings/useUpdateSetting";
import { handleDropdownOptionClick } from "@/utils/handleDropdownOptionClick";
const options = ["bottom", "right", "none"];
const ModuleViewSelect = () => {
  const updateSetting = useUpdateSetting();
  const { data: setting, loading: loading } = useQuery(SettingQueryDocument);
  if (loading) return <div>loading</div>;
  const barView = setting?.setting.barView!;
  const handleSettingUpdate = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    handleDropdownOptionClick();
    const value = e.currentTarget.getAttribute("value");
    updateSetting(setting!, {
      barView: value!,
      id: setting!.setting.id,
    });
  };
  return (
    <>
      <div className={clsx("dropdown dropdown-end")}>
        <div
          tabIndex={0}
          className="m-1 btn btn-xs bg-base-300"
          // onClick={() => setOpen((prev) => !prev)}>
        >
          {barView}
        </div>
        <ul
          tabIndex={0}
          className={clsx(
            "p-2 shadow menu dropdown-content bg-base-100 rounded-box w-40 max-h-64 overflow-y-auto block"
            //   { hidden: !open }
          )}>
          {options.map((option) => (
            <li value={option} key={option} onClick={handleSettingUpdate}>
              <a className="hover:bg-base-300">{option}</a>
            </li>
          ))}
          {/* <li value={key} key={key} onClick={handleSettingUpdate}>
              <a className="hover:bg-base-300">{value}</a>
            </li>
          ))} */}
        </ul>
      </div>
    </>
  );
};

export default ModuleViewSelect;
