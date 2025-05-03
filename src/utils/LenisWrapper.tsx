"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const LennisWrapper = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.15,
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};

export default LennisWrapper;