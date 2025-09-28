import { MultiStepForm } from '@/components';

const Home = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-50 p-4">
            <div className="min-h-[600px] w-full max-w-4xl rounded-xl border border-blue-100 bg-white shadow-sm">
                <MultiStepForm />
            </div>
        </div>
    );
};

export default Home;
