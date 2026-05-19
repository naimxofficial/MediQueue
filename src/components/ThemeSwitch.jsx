"use client";

import { useTheme } from "next-themes";
import {
    Moon,
    Sun
} from "@gravity-ui/icons";
import { Switch } from "@heroui/react";

export function ThemeSwitch() {
    const { theme, setTheme } = useTheme();
    const icons = {
        darkMode: {
            off: Moon,
            on: Sun,
            selectedControlClass: "",
        },
    };

    return (
        <div className="">
            {Object.entries(icons).map(([key, value]) => (
                <Switch onChange={() => setTheme(theme === "dark" ? "light" : "dark")}  key={key} defaultSelected size="lg">
                    {({ isSelected }) => (
                        <>
                            <Switch.Control className={isSelected ? value.selectedControlClass : ""}>
                                <Switch.Thumb>
                                    <Switch.Icon>
                                        {isSelected ? (
                                            <value.on className="size-3 text-inherit opacity-100" />
                                        ) : (
                                            <value.off className="size-3 text-inherit opacity-70" />
                                        )}
                                    </Switch.Icon>
                                </Switch.Thumb>
                            </Switch.Control>
                        </>
                    )}
                </Switch>
            ))}
        </div>
    );
}