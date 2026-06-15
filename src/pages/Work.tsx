import { Layout } from '../components/Layout';
import { Text } from '../components/Text';

const subTitle = "Professional work and personal projects."

export function Work() {
    return (
        <Layout title="Work" subtitle={subTitle}>
            <div className="flex flex-row flex-wrap md:flex-nowrap gap-6">
                <div className="basis-auto md:basis-1/2">
                    <Text variant="p">Consumer products aren't always the most interesting projects. Sometimes, the most impact you can make for people is with the tools they use every day at work. Enterprise level software shouldn't suck.</Text>
            
                    <Text variant="h4">Design experience</Text>
            
                    <Text variant="p">A lot of my work is under NDA. These companies speak about the work I've done.</Text>
                </div>
            </div>

            <div className="flex flex-row flex-wrap md:flex-nowrap gap-6">
                <div className="basis-auto md:basis-1/2">
                    <div className="content-item">
                        <Text variant="h3">Keap</Text>
                        
                        <a href="https://keap.com/features/client-management" className="thumbnail">
                            <img className="img-responsive border-6 border-white mb-4" src="/assets/2021/keap-logo-green.jpg" alt="Keap logo" width="250" />
                        </a>

                
                        <Text variant="p">At Keap, I've worked on several key areas:</Text>
                        
                        <Text variant="ul">
                            <Text variant="li">Sales and ecommerce solutions for small businesses</Text>
                            <Text variant="li">Designing and improving contact management for our CRM that meets the needs of small businesses, helping them reference the right information and take action</Text>
                            <Text variant="li">Design system components, implementation, and scale</Text>
                        </Text>
                    </div>
                </div>

                <div className="basis-auto md:basis-1/2">
                    <div className="content-item">
                        <Text variant="h3">Tallwave</Text>

                        <a href="https://tallwave.com" className="thumbnail">
                            <img className="img-responsive border-6 border-white mb-4" src="/assets/2021/tallwave-logo.jpg" alt="Tallwave logo" width="250" />
                        </a>

                        <Text variant="p">While working at Tallwave, I worked on a range of products as the team lead for product design:</Text>

                        <Text variant="ul">
                            <Text variant="li">Custom CRM and enterprise tools in the fintech sector</Text>
                            <Text variant="li">Design management tools for medical industries</Text>
                            <Text variant="li">Tools for higher education</Text>
                            <Text variant="li">Kickstarting UI guides and design systems across various industries</Text>
                        </Text>
                    </div>
                </div>
            </div>            
        </Layout>
    )
}
