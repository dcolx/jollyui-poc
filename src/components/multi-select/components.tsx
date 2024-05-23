import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Button,
  ComboBox,
  Group,
  Header,
  Input,
  InputProps,
  ListBox,
  ListBoxItem,
  ListBoxItemProps,
  ListBoxProps,
  Popover,
  PopoverProps,
  Separator,
  SeparatorProps,
  Collection,
  Section,
  DialogTrigger,
} from "react-aria-components";

import { cn } from "../../lib/utils";
import { cva } from "class-variance-authority";

const ComboboxSection = Section;
const ComboboxCollection = Collection;

export const inputVariants = cva(
  "flex w-full h-full outline-none px-3 placeholder:text-muted-foreground data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  {
    variants: {
      intent: {
        primary: [
          "bg-global-primary",
          "text-white",
          "placeholder-white",
          "placeholder-opacity-30",
          "uppercase",
        ],
        secondary: [
          "bg-dunno",
          "text-gray-800",
          "border-gray-400",
          "hover:bg-gray-100",
        ],
      },
      size: {
        small: ["text-xs"],
        medium: ["text-base"],
        large: ["text-lg"],
      },
    },
    compoundVariants: [
      {
        intent: "primary",
        size: "large",
        class: "pl-10",
        // **or** if you're a React.js user, `className` may feel more consistent:
        // className: "uppercase"
      },
    ],
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  }
);

export const containerVariants = cva(["h-full w-full"], {
  variants: {
    intent: {
      primary: ["bg-global-primary", "text-white", "uppercase"],
      secondary: ["bg-dunno"],
    },
  },
  defaultVariants: {
    intent: "secondary",
  },
});

export const ComboboxInput = ({
  inputClassName,
  buttonClassName,
  ...props
}: Omit<InputProps, "className"> & {
  inputClassName: string;
  buttonClassName: string;
}) => (
  <Group
    className={cn(
      "group flex h-10 items-center focus:outline-dashed justify-between overflow-hidden rounded-md border border-input bg-background text-sm ring-offset-background data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-ring data-[focus-within]:ring-offset-2 group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-50"
    )}
  >
    <Input className={inputClassName} {...props} />
    <Button className={cn("px-1", buttonClassName)}>
      <ChevronsUpDown aria-hidden="true" className="h-4 w-4 opacity-50" />
    </Button>
  </Group>
);

export interface ComboboxLabelProps
  extends React.ComponentPropsWithoutRef<typeof Header> {
  separator?: boolean;
  offset?: boolean;
}

const ComboboxLabel = ({
  className,
  separator = false,
  offset = false,
  ...props
}: ComboboxLabelProps) => (
  <Header
    className={cn(
      "py-1.5 pl-8 pr-2 text-sm font-semibold",
      {
        "-mx-1 mb-1 border-b border-b-border px-3 pb-[0.625rem]": separator,
        "px-3": offset,
      },
      className
    )}
    {...props}
  />
);

const ComboboxItem = ({
  children,
  ...props
}: Omit<ListBoxItemProps, "className">) => (
  <ListBoxItem
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[focused]:bg-accent data-[focused]:text-accent-foreground data-[disabled]:opacity-50 hover:opacity-50 hover:cursor-pointer"
    )}
    {...props}
  >
    {(values) => (
      <>
        {values.isSelected && (
          <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
            <Check className="h-4 w-4" />
          </span>
        )}

        {typeof children === "function" ? children(values) : children}
      </>
    )}
  </ListBoxItem>
);

const ComboboxSeparator = ({ className, ...props }: SeparatorProps) => (
  <Separator className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
);

/**
 * @see: https://react-spectrum.adobe.com/react-aria/Popover.html
 */
const ComboboxPopover = ({ className, ...props }: PopoverProps) => (
  <Popover
    className={(values) =>
      cn(
        "relative z-50 w-[--trigger-width]  overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2",
        "data-[placement=bottom]:translate-y-1 data-[placement=left]:-translate-x-1 data-[placement=right]:translate-x-1 data-[placement=top]:-translate-y-1",
        typeof className === "function" ? className(values) : className
      )
    }
    {...props}
  />
);


export const ComboboxListBox = React.forwardRef<HTMLDivElement, ListBoxProps<object>>(
  ({className, ...props}, ref) => (
    <ListBox
      ref={ref}
      className={(values) =>
        cn(
          "p-1",
          typeof className === "function" ? className(values) : className
        )
      }
      {...props}
    />
  )
);

export {
  ComboBox,
  DialogTrigger,
  ComboboxSection,
  ComboboxPopover,
  ComboboxLabel,
  ComboboxItem,
  ComboboxSeparator,
  ComboboxCollection,
};
