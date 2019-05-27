/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-04-20 13:24:05
 * @version $Id$
 * @see https://github.com/zhongs/react-marquee
 */

/* global sa */
/* eslint 'no-undef': [2] one-var: [0] no-invalid-this: [0] */

// import dsbridge from './../../../../common/modules/dsbridge';
// import utils from './../../../../common/modules/utils';

import React from 'react';
// import PropTypes from 'prop-types';

import Line1px from './line';
import './styles/current-shared.scss';
import { wxUser } from './../modules/mock';

// requestAnimationFrame 降级方案
import raf from './marquee/raf';

// CurrentShared
class CurrentShared extends React.PureComponent {
    // props 类型检查
    static propTypes = {
        //
    };

    constructor(props) {
        super(props);

        this.state = {
            //
        };

        this.timerMarquee = null;
        this.domMi = null;
        this.domMw = null;
    }

    componentDidMount() {
        raf();
        this.initMarquee();
    }

    componentWillUnmount = () => {
        this.clearMarquee();
    };

    // /////////////////////////////
    initMarquee = () => {
        this.clearMarquee();
        this.runMarquee();
    };
    /**
     * 垂直滚动
     * requestAnimationFrame就是在浏览器下一帧渲染时调用的，所以可以认为requestAnimationFrame的调用速率就是浏览器的刷新速率，一般来说是60帧
     * 但是requestAnimationFrame调用callback的时候会传入一个时间戳参数，可以根据这个参数来进行判断从而处理你实际需要的帧速
     *
     * @param {Number} timestamp requestAnimationFrame() 开始去执行回调函数的时刻
     * @param {Number} elapsed 间隔
     * 1秒10帧
     * @memberof CurrentShared
     */
    verticalMarquee = (timestamp, elapsed) => {
        if (elapsed > 1000 / 10) {
            //TO DO SOMETHING
            this.domMw.scrollTop >= this.domMi.scrollHeight ? (this.domMw.scrollTop = 0) : (this.domMw.scrollTop += 1);
            elapsed = 0;
        }
        this.timerMarquee = window.requestAnimationFrame((_timestamp) => this.verticalMarquee(_timestamp, elapsed + _timestamp - timestamp));
    };

    // 运动
    runMarquee = () => {
        this.clearMarquee();
        this.timerMarquee = window.requestAnimationFrame((timestamp) => this.verticalMarquee(timestamp, 0));
    };

    // 暂停
    clearMarquee = () => {
        this.timerMarquee && cancelAnimationFrame(this.timerMarquee);
    };
    // ////////////////////////////

    render() {
        return (
            <div className="current-shared">
                <div className="shared-title">2.1万人已经成功分享</div>
                <div
                    className="shared-list-wrapper"
                    ref={(mw) => {
                        this.domMw = mw;
                    }}
                >
                    <div
                        className="shared-list"
                        ref={(mi) => {
                            this.domMi = mi;
                        }}
                    >
                        {wxUser.length > 0 &&
                            wxUser.map((item, index) => (
                                <div className="item" key={index}>
                                    <Line1px pos="top" />
                                    <div>
                                        <span className="avatar" style={{ backgroundImage: `url(${item.avatar})` }} />
                                        <span className="text">{item.name}</span>
                                    </div>
                                    <span className="btn">1分钟前分享成功</span>
                                </div>
                            ))}
                    </div>

                    { <div className="shared-list">
                        {wxUser.length > 0 &&
                            wxUser.map((item, index) => (
                                <div className="item" key={index}>
                                    <Line1px pos="top" />
                                    <div>
                                        <span className="avatar" style={{ backgroundImage: `url(${item.avatar})` }} />
                                        <span className="text">{item.name}</span>
                                    </div>
                                    <span className="btn">1分钟前分享成功</span>
                                </div>
                            ))}
                    </div> }
                </div>
            </div>
        );
    }
}

//
export default CurrentShared;
