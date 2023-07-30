import clsx from "clsx";
import { handleDropdownOptionClick } from "@/utils/handleDropdownOptionClick";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  RightBarViewOptions,
  setRightBarView,
} from "@/redux/slices/generalSlice";
const options = ["bottom", "right", "left"];
const ModuleViewSelect = () => {
  // const updateSetting = useUpdateSetting();
  // const { data: setting, loading: loading } = useQuery(SettingQueryDocument);
  // if (loading) return <div>loading</div>;
  // const barView = setting?.setting.barView!;
  const dispatch = useAppDispatch();
  const { rightBarView } = useAppSelector((state) => state.general);
  const handleSettingUpdate = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    handleDropdownOptionClick();
    const value = e.currentTarget.getAttribute("value");
    dispatch(setRightBarView(value as RightBarViewOptions));
  };
  return (
    <>
      <div className={clsx("dropdown dropdown-end")}>
        <div
          tabIndex={0}
          className="m-1 btn btn-xs bg-base-300"
          // onClick={() => setOpen((prev) => !prev)}>
        >
          {rightBarView}
        </div>
        <ul
          tabIndex={0}
          className={clsx(
            "p-2 shadow menu dropdown-content bg-base-100 rounded-box w-40 max-h-64 overflow-y-auto block"
            //   { hidden: !open }
          )}>
          {options.map((option) => (
            <li value={option} key={option} onClick={handleSettingUpdate}>
              <button className="hover:bg-base-300">{option}</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ModuleViewSelect;
