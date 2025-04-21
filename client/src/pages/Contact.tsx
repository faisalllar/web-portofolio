import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GithubIcon, InstagramIcon, LinkedinIcon, MailIcon, MapPinIcon, PhoneIcon, SendIcon } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

const Contact = () => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you as soon as possible.",
    });
    form.reset();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const contactInfo = [
    {
      icon: <PhoneIcon className="h-5 w-5" />,
      title: "Phone",
      detail: "+62 812 3456 7890",
      link: "tel:+6281234567890"
    },
    {
      icon: <MailIcon className="h-5 w-5" />,
      title: "Email",
      detail: "faisal@example.com",
      link: "mailto:faisal@example.com"
    },
    {
      icon: <MapPinIcon className="h-5 w-5" />,
      title: "Location",
      detail: "Makassar, Indonesia",
      link: "https://goo.gl/maps/YwNJWE19EMp6Jgik7"
    }
  ];

  const socialLinks = [
    {
      icon: <GithubIcon className="h-5 w-5" />,
      link: "https://github.com/",
      label: "GitHub"
    },
    {
      icon: <LinkedinIcon className="h-5 w-5" />,
      link: "https://linkedin.com/",
      label: "LinkedIn"
    },
    {
      icon: <InstagramIcon className="h-5 w-5" />,
      link: "https://instagram.com/",
      label: "Instagram"
    }
  ];

  return (
    <motion.section
      id="contact"
      className="py-16 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-16" 
          variants={itemVariants}
        >
          <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Feel free to reach out for collaborations, opportunities, or just to say hello!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <motion.div 
            className="md:col-span-2"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-6">Let's Connect</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              I'm currently available for freelance work, full-time positions, or interesting projects.
              If you'd like to discuss further, don't hesitate to get in touch.
            </p>

            <div className="space-y-6 mb-10">
              {contactInfo.map((item, index) => (
                <a 
                  key={index} 
                  href={item.link}
                  className="flex items-center space-x-4 group"
                >
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.detail}</p>
                  </div>
                </a>
              ))}
            </div>

            <h3 className="text-lg font-bold mb-4">Follow Me</h3>
            <div className="flex space-x-4">
              {socialLinks.map((item, index) => (
                <a 
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors duration-300"
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="md:col-span-3 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Your subject" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message" 
                          className="min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  <SendIcon className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;