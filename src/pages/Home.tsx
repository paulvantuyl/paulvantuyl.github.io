import { useState } from 'react'
import { Layout } from '../components/Layout'
import { Button } from '../components'

export function Home() {
    const [count, setCount] = useState(0)

    return (
        <Layout>
            <h1>Hello, World</h1>
            <p>Can enterprise software be interesting?</p>
            <p className="my-3">
                <Button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </Button>
            </p>
            <h3 className="post-tags">TL;DR</h3>
            <p>Hi, I'm Paul Van Tuyl. In case you're wondering, my name is pronounced <em>Van Tile</em>. I'm a huge nerd who loves designing applications (mobile or SaaS). A few fun facts:</p>

            <ul className="datalist">
                <li>My wife and I have kids, and we try to help kids in the foster care system.</li>
                <li>I'm more of a dog person, but let's be honest. Cats are really funny.</li>
                <li>I work full-time as a Principal Product Designer at <a href="https://get.keap.com/do5da5ak3eui" title="Keap">Keap</a> in Chandler, AZ.</li>
                <li>I'm a gamer.<i className="far fa-gamepad"></i></li>
            </ul>

            <h3>My personal mission statement</h3>

            <p><em>My professional goal is to use my curiosity, love for design, and craftsmanship to create products, processes, and objects that improve quality of life for human beings.</em></p>

            <h2>Résumé</h2>

            <p>I've been working as a designer full time since 2006. While my education was in graphic design for print, the majority of my experience has been in digital formats. I fell in love with the web while in school, and come from the era (and a place) where you had to be able to both design and develop your work.</p>

            <p>I think that design isn't just how things look. It's how it works, looks, and makes you feel.</p>

            <h3>Experience</h3>

            <p>Thryv</p>

            <dl>
                <dt>
                    Staff Product Designer<br />
                    Keap
                </dt>
                <dd>
                    <p><span className="text-muted">Chandler, AZ (Remote)</span><br />
                        <span className="text-muted">July 2018 &ndash; Present</span></p>
                    <p>As a Staff Product Designer at <a href="https://get.keap.com/do5da5ak3eui">Keap</a>, I fill a hybrid role of people leader and individual contributor. You may find me:</p>
                    <ul className="datalist">
                        <li>Helping with design sprints</li>
                        <li>Working with PMs, Researchers, Engineers, and other Designers to concept and develop end-to-end desktop and mobile-responsive experiences that deliver on customer and business outcomes</li>
                        <li>Working with team members to validate design using customer research and leverage analytics to make data-informed decisions</li>
                        <li>Helping the designers that work with me level up their careers</li>
                        <li>Championing and improving our design system</li>
                    </ul>
                    <p><small>Other positions held: Principal Product Designer</small></p>
                </dd>
            </dl>

            <dl>
                <dt>
                    Design Team Lead<br />
                    Tallwave
                </dt>
                <dd>
                    <p><span className="text-muted">Scottsdale, AZ</span><br />
                        <span className="text-muted">January, 2015 &ndash; July, 2018</span></p>
                    <p>As a Design Team Lead at <a href="https://tallwave.com/">Tallwave</a>, I helped guide efforts to implement design thinking as we created business solutions and opportunities &ndash; through well-crafted experiences, products, and services &ndash; for Tallwave's clients. I worked directly with clients to help define strategy and requirements for projects and direct team members how to execute against specific business outcomes effectively and efficiently.</p>
                    <p>Within the Design Team at Tallwave, my role extended into several areas. Repeatable and effective design process is important at Tallwave, so I worked on ways that we could improve our workflows, methods, and production pipelines. Design Team Leads were also responsible for reviewing work and providing feedback, mentoring team members, scoping projects, and trying to unlock creative potential.<br />
                        <small>Other positions held: Emotional Design Lead, Sr. Product Designer</small></p>
                </dd>
            </dl>

            <dl>
                <dt>
                    Sr. Product Designer<br />
                    29th Drive
                </dt>
                <dd>
                    <p><span className="text-muted">Scottsdale, AZ</span><br />
                        <span className="text-muted">September, 2013 &ndash; December, 2014</span></p>
                    <p>At 29th Drive, we primarily worked as a boutique UX Design firm. Team members had to be cross-disciplinary; my responsibilities included UX Design, UI Design, Front End Development, Brand Design, and Email Design.<br />
                        <small>Other positions held: Product Designer &amp; Front End Developer</small></p>
                </dd>
            </dl>

            <h3>Amazing customers</h3>

            <p>Some of the customers I've had the great opportunity to work with throughout my career include ASU, American Express, AppointmentPlus, CBANC, Cybersponse, Full Contour, Gibson Dunn, Isagenix, author John Dickerson, Minitab, PayPal, and Weave Education.</p>

            <h3>Speaking engagements</h3>

            <dl>
                <dt>Phoenix Design Week, 2017</dt>
                <dd>
                    <span className="text-muted">Phoenix, AZ</span><br />
                    Presenter for a User Experience Breakout Session, <em>Design consistency, craft, efficiency, and cat memes</em>
                </dd>
            </dl>
            <span className="three-em-dash"></span>

            <dl>
                <dt>Phoenix Design Week, 2015</dt>
                <dd>
                    <span className="text-muted">Phoenix, AZ</span><br />
                    Co-presenter for a Startups track workshop, <em>5 Product &amp; Business Design Secrets for Designers with Great Ideas</em>
                </dd>
            </dl>
            <span className="three-em-dash"></span>

            <dl>
                <dt>UX Week, 2014</dt>
                <dd>
                    <span className="text-muted">San Francisco, CA</span><br />
                    Co-presenter for a UX Week Workshop, <em>Design Studios &amp; Pen Sketching for Makers of Apps &amp; Websites</em>
                </dd>
            </dl>

            <h3 className="mt-4">Education</h3>
            <dl>
                <dt>
                    Remote Work Certification
                </dt>
                <dd>
                    <span className="text-muted">Workplaceless</span><br />
                    <span className="text-muted">March, 2021</span><br /><br />
                    <a href="https://www.credential.net/57ec24d5-d706-473d-ad01-63206bc18caf" className="thumbnail">
                        <img src="https://api.accredible.com/v1/frontend/credential_website_embed_image/badge/30724418" />
                    </a>
                </dd>
            </dl>

            <dl>
                <dt>
                    Associate of Applied Science in Graphic Design
                </dt>
                <dd>
                    <span className="text-muted">Yavapai College</span><br />
                    <span className="text-muted">May, 2006</span><br />
                    Graduated with honors <i className="far fa-laugh-beam"></i>
                </dd>
            </dl>
        </Layout>
    )
}
