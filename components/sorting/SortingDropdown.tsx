import * as React from "react"

import { useMediaQuery } from '@react-hook/media-query'
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronDown } from "lucide-react"

type Status = {
    value: string
    label: string
}

const statuses: Status[] = [
    {
        value: "default",
        label: "Default",
    },
    {
        value: "rating-high",
        label: "Rating: High to Low",
    },
    {
        value: "rating-low",
        label: "Rating: Low to High",
    },
    {
        value: "price-high",
        label: "Price: High to Low",
    },
    {
        value: "price-low",
        label: "Price: Low to High",
    },
]

export default function SortingDropdown() {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
        null
    )

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[300px] flex justify-between">
                        <span className="truncate">{selectedStatus ? <>{selectedStatus.label}</> : <>Default</>}</span>
                        <ChevronDown size={10} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
                </PopoverContent>
            </Popover>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-start">
                    {selectedStatus ? <>{selectedStatus.label}</> : <>Default</>}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mt-4 border-t">
                    <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}

function StatusList({
    setOpen,
    setSelectedStatus,
}: {
    setOpen: (open: boolean) => void
    setSelectedStatus: (status: Status | null) => void
}) {
    return (
        <Command>
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {statuses.map((status) => (
                        <CommandItem
                            key={status.value}
                            value={status.value}
                            onSelect={(value) => {
                                setSelectedStatus(
                                    statuses.find((priority) => priority.value === value) || null
                                )
                                setOpen(false)
                            }}
                        >
                            {status.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}
