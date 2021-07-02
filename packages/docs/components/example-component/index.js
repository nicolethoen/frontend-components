import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Title, Card, CardBody } from '@patternfly/react-core';
import dynamic from 'next/dynamic';
import classnames from 'classnames';
import { createUseStyles } from 'react-jss';
import ExpandablePanel from './expandable-panel';
import { H2 } from '../layout/mdx-provider-components';

const useStyles = createUseStyles({
    name: {
        '&:first-letter': {
            textTransform: 'capitalize'
        }
    },
    exampleContainer: {
        widht: '100%'
    }
});

const ExampleComponent = ({ source, name, codeOnly }) => {
    const { current: Component } = useRef(dynamic(import(`@docs/examples/${source}`)));
    const [ sourceCode, setSourceCode ] = useState('');
    const classes = useStyles();

    useEffect(() => {
        import(`!raw-loader!@docs/examples/${source}`).then((file) => {
            setSourceCode(file.default);
        });
    }, []);
    return (
        <div className={classes.exampleContainer}>
            <H2 className={classnames(classes.name)}>{name}</H2>
            {!codeOnly && Component && <Card className="pf-u-mb-md"><CardBody><Component /></CardBody></Card>}
            <ExpandablePanel codeOnly={codeOnly} source={source} sourceCode={sourceCode} />
        </div>
    );
};

ExampleComponent.propTypes = {
    source: PropTypes.string.isRequired,
    name: PropTypes.string,
    codeOnly: PropTypes.bool
};

export default ExampleComponent;
