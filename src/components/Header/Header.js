import React, { Component } from 'react';
import { Button, Link, Text, Tooltip } from 'mineral-ui';
import { IconPowerSettingsNew } from 'mineral-ui-icons';
import './Header.css';
import image from './broadcom.png'

export function Header() {
    return (
        <div className="container">
            <div>
            <span>
            <Text element="h2"><span align="right">
            <img align="center" src={image} height="25px"></img>
            </span> | GitHub2Rally Configuration Page</Text>
            </span>
            </div>
        </div>
    );
}
