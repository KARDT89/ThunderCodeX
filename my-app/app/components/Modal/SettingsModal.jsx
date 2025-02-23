import { BsCheckLg, BsChevronDown } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import useLocalStorage from "@/hooks/useLocalStorage";

const EDITOR_FONT_SIZES = ["12px", "13px", "14px", "15px", "16px", "17px", "18px", "20px", "22px", "25px"];

const SettingsModal = ({ settings, setSettings }) => {
  const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");

  const handleClickDropdown = (e) => {
    e.stopPropagation();
    setSettings({ ...settings, dropdownIsOpen: !settings.dropdownIsOpen });
  };

  return (
    <div className="text-white z-50">
      <div aria-modal="true" role="dialog" className="fixed inset-0 overflow-y-auto backdrop-blur-sm">
        <div className="flex min-h-screen items-center justify-center px-4">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 transition-opacity duration-300"
            onClick={() => setSettings({ ...settings, settingsModalIsOpen: false })}
          />
          {/* Modal */}
          <div className="bg-zinc-900/90 backdrop-blur-lg shadow-2xl rounded-2xl w-full max-w-lg p-6 transform transition-all scale-100 opacity-100">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-700 pb-4">
              <h2 className="text-lg font-semibold">⚙️ Settings</h2>
              <button
                className="hover:bg-zinc-700 p-2 rounded-full transition-colors"
                onClick={() => setSettings({ ...settings, settingsModalIsOpen: false })}
              >
                <IoClose className="text-2xl" />
              </button>
            </div>

            {/* Font Size Section */}
            <div className="mt-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-base font-medium">Font Size</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Choose your preferred font size for the code editor.
                  </p>
                </div>
                <div className="relative w-[170px]">
                  <button
                    onClick={handleClickDropdown}
                    className="flex justify-between items-center w-full bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm transition-all shadow-inner"
                  >
                    {fontSize}
                    <BsChevronDown />
                  </button>
                  {/* Dropdown */}
                  {settings.dropdownIsOpen && (
                    <ul
                      className="absolute z-50 w-full bg-zinc-800 rounded-lg mt-2 py-2 shadow-xl transition-all duration-300"
                    >
                      {EDITOR_FONT_SIZES.map((size, idx) => (
                        <SettingsListItem
                          key={idx}
                          fontSize={size}
                          selectedOption={settings.fontSize}
                          handleFontSizeChange={(fontSize) => {
                            setFontSize(fontSize);
                            setSettings({ ...settings, fontSize });
                          }}
                        />
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

const SettingsListItem = ({ fontSize, selectedOption, handleFontSizeChange }) => {
  return (
    <li
      className={`cursor-pointer px-4 py-2 rounded-lg hover:bg-zinc-700 transition-all flex justify-between ${
        selectedOption === fontSize ? "bg-zinc-700 font-semibold" : ""
      }`}
      onClick={() => handleFontSizeChange(fontSize)}
    >
      {fontSize}
      {selectedOption === fontSize && <BsCheckLg className="text-green-400" />}
    </li>
  );
};
