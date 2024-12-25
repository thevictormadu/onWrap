import React from 'react';
import {FrostedGlassProps} from '../types';


const FrostedGlass: React.FC<FrostedGlassProps> = ({
                                                       children,
                                                       borderRadius = "16px",
                                                       blur = "50px",
                                                   }) => {
    return (
        <div
            className={"frosted-glass"}
            style={{
                width: "auto",
                borderRadius,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: `blur(${blur})`,
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {children}
        </div>
    );
};

export default FrostedGlass;