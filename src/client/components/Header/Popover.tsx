import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '../../utils'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = ({
  className,
  ...props
}: PopoverPrimitive.PopoverContentProps) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      sideOffset={24}
      className={cn(
        'z-30 mx-2 rounded-xl border border-black/10 bg-gray-50/20 p-4 text-gray-800 shadow-md outline-none backdrop-blur-md transition-[height] will-change-[height] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-white/10 dark:bg-black/20 dark:text-gray-200',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
)

export { Popover, PopoverContent, PopoverTrigger }

