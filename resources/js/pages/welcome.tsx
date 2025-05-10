import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
    submit?: string;
}

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const lastScrollY = useRef(0);

    // Ensure light theme is default on initial load
    useEffect(() => {
        document.documentElement.classList.remove('dark');
    }, []);

    // Header scroll animation effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY < 50) {
                setShowHeader(true);
                lastScrollY.current = window.scrollY;
                return;
            }
            if (window.scrollY > lastScrollY.current) {
                setShowHeader(false); // scrolling down
            } else {
                setShowHeader(true); // scrolling up
            }
            lastScrollY.current = window.scrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Skills data with detailed information
    const skills = {
        frontend: {
            skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
            description: 'Expertise in modern frontend development with a focus on responsive design and user experience.',
            projects: [
                {
                    title: 'E-commerce Platform',
                    description: 'Built with React and TypeScript, featuring responsive design and modern UI/UX',
                    image: '/images/projects/ecommerce.jpg',
                    repo: 'https://github.com/yourusername/ecommerce-platform'
                }
            ]
        },
        backend: {
            skills: ['Node.js', 'Express', 'PHP', 'Laravel'],
            description: 'Strong backend development skills with experience in both Node.js and PHP ecosystems.',
            projects: [
                {
                    title: 'API Gateway',
                    description: 'RESTful API service built with Node.js and Express',
                    image: '/images/projects/api.jpg',
                    repo: 'https://github.com/yourusername/api-gateway'
                }
            ]
        },
        tools: {
            skills: ['Git', 'VS Code', 'Figma', 'Postman'],
            description: 'Proficient in development tools and software that enhance productivity and collaboration.',
            projects: []
        },
        databases: {
            skills: ['MySQL', 'MongoDB', 'PostgreSQL'],
            description: 'Experience with both SQL and NoSQL databases, focusing on performance and scalability.',
            projects: []
        }
    };

    // Projects data
    const projects = [
        {
            title: 'De Dash Dash E-commerce',
            description: 'A modern e-commerce platform for custom fashion pieces, featuring a responsive design, shopping cart functionality, and product showcase.',
            image: '/images/projects/e-commerce.png',
            repo: 'https://github.com/enohakpan/wdd131/tree/main/Final-Project',
            live: 'https://enohakpan.github.io/wdd131/Final-Project/index.html',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design']
        },
        {
            title: 'White Water Rafting',
            description: 'A dynamic website for a rafting company showcasing adventure trips, company history, and booking information with a focus on user experience and responsive design.',
            image: '/images/projects/rafting.png',
            repo: 'https://github.com/enohakpan/wdd130/tree/main/wwr',
            live: 'https://enohakpan.github.io/wdd130/wwr/about.html',
            technologies: ['HTML5', 'CSS3', 'Responsive Design', 'Wireframing']
        }
    ];

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        
        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.length < 10) {
            newErrors.message = 'Message must be at least 10 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Here you would typically make an API call to your backend
            // For now, we'll simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setSubmitSuccess(true);
            setFormData({ name: '', email: '', message: '' });
            
            // Reset success message after 3 seconds
            setTimeout(() => {
                setSubmitSuccess(false);
            }, 3000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({
                submit: 'Failed to send message. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Head title="Portfolio">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className={`min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300`}>
                {/* Navigation */}
                <nav className={`fixed top-0 w-full bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 z-50 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="flex flex-row-reverse sm:flex-row justify-between items-center h-12 sm:h-16 gap-2 sm:gap-0 py-1 sm:py-0">
                            {/* Hamburger for mobile (left) */}
                            <div className="flex items-center sm:hidden mr-2">
                                <button
                                    onClick={() => setMobileNavOpen((open) => !open)}
                                    className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    aria-label="Toggle navigation"
                                >
                                    {mobileNavOpen ? (
                                        // X icon
                                        <svg className="w-7 h-7 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        // Hamburger icon
                                        <svg className="w-7 h-7 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {/* Profile image and name */}
                            <div className="flex items-center gap-2 sm:gap-4">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-purple-200 dark:border-purple-800">
                                    <img
                                        src="/images/profile/ENOH.jpg"
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-base sm:text-xl font-semibold text-gray-800 dark:text-white whitespace-nowrap">Enoh Uwem Akpan</div>
                            </div>
                            {/* Desktop nav */}
                            <div className="hidden sm:flex flex-wrap items-center gap-4 sm:gap-6">
                                <a
                                    href="#skills"
                                    className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                                    onClick={e => {
                                        e.preventDefault();
                                        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    Skills
                                </a>
                                <a
                                    href="#projects"
                                    className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                                    onClick={e => {
                                        e.preventDefault();
                                        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    Projects
                                </a>
                                <a
                                    href="#contact"
                                    className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                                    onClick={e => {
                                        e.preventDefault();
                                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    Contact
                                </a>
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    {isDarkMode ? '🌞' : '🌙'}
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Mobile nav dropdown */}
                    <div className={`sm:hidden transition-all duration-300 ${mobileNavOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'} overflow-hidden bg-white/95 dark:bg-gray-900/95 px-4 z-50 fixed top-12 left-0 right-0 rounded-b-lg shadow-lg`}> 
                        <div className="flex flex-col gap-4 py-2">
                            <a
                                href="#skills"
                                className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                                onClick={e => {
                                    e.preventDefault();
                                    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Skills
                            </a>
                            <a
                                href="#projects"
                                className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                                onClick={e => {
                                    e.preventDefault();
                                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Projects
                            </a>
                            <a
                                href="#contact"
                                className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                                onClick={e => {
                                    e.preventDefault();
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Contact
                            </a>
                            <button
                                onClick={toggleTheme}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                {isDarkMode ? '🌞' : '🌙'}
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="pt-20">
                    {/* Profile Section */}
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                            <div className="w-40 h-40 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-purple-200 dark:border-purple-800 mx-auto md:mx-0">
                                <img
                                    src="/images/profile/ENOH.jpg"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 text-center md:text-left mt-6 md:mt-0">
                                <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
                                    Enoh Uwem Akpan
                                </h1>
                                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
                                    Frontend Web Developer
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto md:mx-0">
                                    Passionate about creating beautiful and functional web applications. Specializing in modern frontend technologies and responsive design.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Skills Section */}
                    <section id="skills" className="bg-white dark:bg-gray-800 py-12 sm:py-20 relative">
                        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${selectedSkill ? 'opacity-50' : ''}`}>
                            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
                                Skills
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                                {Object.entries(skills).map(([category, data]) => (
                                    <div
                                        key={category}
                                        className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                        onClick={() => setSelectedSkill(category)}
                                    >
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 capitalize">
                                            {category}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {data.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-3 py-1 bg-white dark:bg-gray-800 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 rounded-full text-sm"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Projects Section */}
                    <section id="projects" className="py-12 sm:py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
                                Projects
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                {projects.map((project) => (
                                    <div key={project.title} className="group">
                                        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                            <div className="aspect-w-16 aspect-h-9">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                                                    {project.title}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                                    {project.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {project.technologies.map((tech) => (
                                                        <span
                                                            key={tech}
                                                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-sm"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex gap-4">
                                                    <a
                                                        href={project.repo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                                                    >
                                                        View Code
                                                    </a>
                                                    {project.live && (
                                                        <a
                                                            href={project.live}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                                                        >
                                                            Live Demo
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section id="contact" className="bg-white dark:bg-gray-800 py-12 sm:py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
                                Contact
                            </h2>
                            <div className="max-w-2xl mx-auto">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={`mt-1 block w-full rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white shadow-sm px-4 py-2 ${
                                                errors.name ? 'border-red-500 dark:border-red-500' : ''
                                            }`}
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`mt-1 block w-full rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white shadow-sm px-4 py-2 ${
                                                errors.email ? 'border-red-500 dark:border-red-500' : ''
                                            }`}
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            className={`mt-1 block w-full rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white shadow-sm px-4 py-2 ${
                                                errors.message ? 'border-red-500 dark:border-red-500' : ''
                                            }`}
                                        />
                                        {errors.message && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                                        )}
                                    </div>
                                    {errors.submit && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
                                    )}
                                    {submitSuccess && (
                                        <p className="text-sm text-green-600 dark:text-green-400">
                                            Message sent successfully!
                                        </p>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                                            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Skill Details Overlay */}
                {selectedSkill && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedSkill(null)} />
                        <div className="relative bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6 shadow-xl transform transition-all duration-300 scale-100">
                            <button
                                onClick={() => setSelectedSkill(null)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                ✕
                            </button>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 capitalize">
                                {selectedSkill}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                {skills[selectedSkill as keyof typeof skills].description}
                            </p>
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                    {skills[selectedSkill as keyof typeof skills].skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                {skills[selectedSkill as keyof typeof skills].projects.length > 0 && (
                                    <>
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">Related Projects</h4>
                                        <div className="space-y-4">
                                            {skills[selectedSkill as keyof typeof skills].projects.map((project) => (
                                                <a
                                                    key={project.title}
                                                    href={project.repo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                                >
                                                    <h5 className="font-medium text-gray-900 dark:text-white">{project.title}</h5>
                                                    <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
                                                </a>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Mobile menu overlay */}
                {mobileNavOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/30 sm:hidden"
                        onClick={() => setMobileNavOpen(false)}
                    />
                )}
            </div>
        </>
    );
}
