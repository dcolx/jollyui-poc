import { VariantProps } from "class-variance-authority";
import { ChevronsUpDown } from "lucide-react";
import React from "react";
import { DialogTrigger, Group, Button } from "react-aria-components";
import {
  inputVariants,
  containerVariants,
  ComboboxListBox,
  ComboboxInput,
  ComboboxPopover,
  ComboBox,
} from "./components";

type ComboboxVariants = VariantProps<typeof inputVariants> &
  VariantProps<typeof containerVariants>;

type ComboboxProps = Pick<
  React.ComponentProps<typeof ComboBox>,
  | "onSelectionChange"
  | "allowsCustomValue"
  | "selectedKey"
  | "aria-label"
  | "menuTrigger"
>;

export function ReusableCombobox({
  children,
  placeholder,
  intent,
  size,
  ...props
}: ComboboxVariants &
  Pick<React.ComponentProps<typeof ComboboxListBox>, "children"> &
  Pick<React.ComponentProps<typeof ComboboxInput>, "placeholder">) {
  const variants: ComboboxVariants = {
    intent,
    size,
  };

  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [popoverStyle, setPopoverStyle] = React.useState({});

  React.useEffect(function updatePopoverStyle() {
    function onResize() {
      setPopoverStyle({
        width: containerRef.current?.clientWidth,
      });
    }
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      ref={containerRef}
      onBlur={() => {
        // setIsOpen(false)
      }}
    >
      <DialogTrigger>
        {/* <Input type="text" />
        <Button>Multiselect</Button> */}
        <Group
          //   onFocus={() => {
          //     console.log("zzzzz");
          //     setIsOpen(true);
          //   }}
          //   onBlur={() => {
          //     setIsOpen(false);
          //   }}
          className="flex rounded-lg bg-white bg-opacity-90 focus-within:bg-opacity-100 transition shadow-md ring-1 ring-black/10 focus-visible:ring-2 focus-visible:ring-black"
        >
          <input
            placeholder="X selected items"
            ref={inputRef}
            // onBlur={() => {
            //   // setIsOpen(false)
            // }}
            onFocus={() => {
              setIsOpen(true);
            }}
            className="flex-1 w-full border-none py-2 px-3 leading-5 text-gray-900 bg-transparent outline-none text-base"
          />

          <Button
            // onPress={() => {
            //   setIsOpen(true);
            // }}
            className="px-3 flex items-center border-none outline-none pointer-events-noneeee"
          >
            <ChevronsUpDown aria-hidden="true" className="h-4 w-4 opacity-50" />
          </Button>
        </Group>
        <ComboboxPopover
          style={popoverStyle}
          triggerRef={containerRef}
          //   scrollRef={containerRef}
          isNonModal={true}
          isOpen={isOpen}
          //   onOpenChange={() => {
          //     alert("zzz");
          //     console.log("onOpenChange");
          //   }}
          shouldCloseOnInteractOutside={(e) => {
            console.log("TEST!!!!!!");
            setIsOpen(false);
            return true;
          }}
        >
          <ComboboxListBox
            autoFocus
            className={containerVariants(variants)}
            // selectionBehavior='toggle'
            selectionMode="multiple"
            onFocusChange={(isFocused) => {
              if (!isFocused) setIsOpen(false);
            }}
          >
            {children}
          </ComboboxListBox>
        </ComboboxPopover>
      </DialogTrigger>
    </div>
  );
}

export {
  ComboboxSection,
  ComboboxPopover,
  ComboboxLabel,
  ComboboxItem,
  ComboboxSeparator,
  ComboboxCollection,
} from "./components";
