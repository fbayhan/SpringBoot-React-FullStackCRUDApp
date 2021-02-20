import React, { Component } from 'react';

 class HeaderComponent extends Component {
    render() {
        return (
            <div>

                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div>
                            <a href="http://github.com/fbayhan" target="_blank" className="navbar-brand">React Spring Boot Rest Api</a>
                        </div>

                    </nav>

                </header>

            </div>
        );
    }
}

export default HeaderComponent;