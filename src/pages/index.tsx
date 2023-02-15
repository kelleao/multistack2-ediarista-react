import { GetStaticProps, NextPage } from 'next';
import Advantages from '@partials/index/_advantages';
import FrequentQuestions from '@partials/index/_frequent-questions';
import Presentation from '@partials/index/_presentation';

import { useForm } from 'react-hook-form';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: '',
        },
    };
};

const Index: NextPage<{ title: string }> = (props) => {
    const { register } = useForm();

    return (
        <div>
            <Presentation />
            <Advantages />
            <FrequentQuestions />
        </div>
    );
};

export default Index;
