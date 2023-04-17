import ForgeUI, { render, ProjectPage, Fragment, Text } from '@forge/ui';

const App = () => {
    return (
        <Fragment>
            <Text>Hello world! 2</Text>
        </Fragment>
    );
};

export const run = render(
    <ProjectPage>
        <App />
    </ProjectPage>
);
