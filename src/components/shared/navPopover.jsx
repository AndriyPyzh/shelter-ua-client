import React, { useEffect, useRef, useState } from 'react';
import { Overlay, Popover } from "react-bootstrap";

const NavPopover = ({ title, text, classes, children }) => {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };

    const handleClickOutside = e => {
        if (ref.current.contains(e.target))
            return;
        setShow(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={ ref }>
            <button className={ classes } onClick={ handleClick }>{ text }</button>
            <Overlay
                show={ show }
                target={ target }
                placement="bottom"
                container={ ref.current }
                containerPadding={ 20 }
            >
                <Popover id="popover-contained">
                    <Popover.Title as="h3" className="text-center">{ title }</Popover.Title>
                    <Popover.Content onClick={ handleClick }>
                        { children }
                    </Popover.Content>
                </Popover>
            </Overlay>
        </div>
    );
};

export default NavPopover;
