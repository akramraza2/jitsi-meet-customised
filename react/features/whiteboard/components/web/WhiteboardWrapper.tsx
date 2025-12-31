import { ExcalidrawApp } from '@jitsi/excalidraw';
import i18next from 'i18next';
import React, { useCallback, useRef } from 'react';

import { WHITEBOARD_UI_OPTIONS } from '../../constants';
import './whiteboard.css';

/**
 * Whiteboard wrapper for mobile.
 *
 * @returns {JSX.Element}
 */
const WhiteboardWrapper = ({
    className,
    collabDetails,
    collabServerUrl,
    localParticipantName,
    readonly
}: {
    className?: string;
    collabDetails: {
        roomId: string;
        roomKey: string;
    };
    collabServerUrl: string;
    localParticipantName: string;
    readonly: boolean;
}) => {
    const excalidrawRef = useRef<any>(null);
    const excalidrawAPIRef = useRef<any>(null);
    const collabAPIRef = useRef<any>(null);

    const getExcalidrawAPI = useCallback(api => {
        excalidrawAPIRef.current = api;

        if (readonly) {
            setTimeout(() => {
                api.updateScene({
                    appState: {
                        viewModeEnabled: true,
                        zenModeEnabled: true
                    }
                });

                api.setActiveTool({ type: 'selection' });
            }, 0);
        }
    }, [readonly]);



    const getCollabAPI = useCallback(collabAPI => {
        if (collabAPIRef.current) {
            return;
        }
        collabAPIRef.current = collabAPI;
        collabAPIRef.current.setUsername(localParticipantName);
    }, [ localParticipantName ]);


    return (
        //<div className = { className }>
        <div className={`${className} ${readonly ? 'readonly' : ''}`}>
            {readonly && (
            <div className="whiteboard-readonly-banner">
                View only – mode for students
            </div>
         )}

            <div className = 'excalidraw-wrapper'>
                <ExcalidrawApp
                    collabDetails = { collabDetails }
                    collabServerUrl = { collabServerUrl }
                    detectScroll = { true }
                    excalidraw = {{
                        isCollaborating: true,
                        langCode: i18next.language,

                        // @ts-ignore
                        ref: excalidrawRef,
                        theme: 'light',
                        UIOptions: readonly
                            ? {
                                ...WHITEBOARD_UI_OPTIONS,
                                canvasActions: {
                                    clearCanvas: false,
                                    export: false,
                                    saveAsImage: false
                                }
                            }
                            : WHITEBOARD_UI_OPTIONS
                    }}
                    getCollabAPI = { getCollabAPI }
                    getExcalidrawAPI = { getExcalidrawAPI } />
            </div>


        </div>
    );
};

export default WhiteboardWrapper;
