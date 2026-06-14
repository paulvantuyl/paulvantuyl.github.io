import { Text } from '../Text';
import './Footer.css';

const year = new Date().getFullYear();

export function Footer() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <footer>
                <div className="footer-inner">
                    <div className="flex flex-row gap-6">
                        <div className="basis-1/3">
                            <Text variant="p"><small>&copy; 2014&ndash;{year} Paul Van Tuyl. All rights reserved.</small></Text>
                        </div>
                        <div className="basis-1/3">
                            <Text variant="p">
                                <small>Design, HTML, CSS, &amp; JS by Paul Van Tuyl. Built with <a href="https://react.dev">React</a>. Served up by <a href="https://pages.github.com">Github Pages</a>. View the <a href="https://github.com/paulvantuyl/paulvantuyl.github.io">source.</a></small>
                            </Text>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
