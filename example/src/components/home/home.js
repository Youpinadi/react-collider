import React from 'react'
import VideoPreview from './../video/preview'
import provider from './../../lib/data-provider'

export default class Home extends React.Component {
    static fetchData() {
        return provider('wtw-videos', 'https://api.dailymotion.com/videos?list=what-to-watch&fields=title,thumbnail_240_url', true)
    }
    componentWillMount() {
        var self = this
        this.getVideosList(function(data) {
            self.setState({videos: data})
        })
    }
    outputScript() {
        var data = this.props.data
        if (typeof data === 'object') {
            data = JSON.stringify(data)
        }

        return {__html: "var initialData = " + data}
    }
    getVideosList(cb) {
        var videos = '',
            i = 0

        var data = this.props.data

        if (typeof data === 'string') {
            data = JSON.parse(data)
        }

        if (typeof data === 'object' && typeof data.list !== 'undefined') {
            videos = data.list.map(function(video) {
                return <VideoPreview key={i++} video={video} />
            })
        }

        cb(videos)
    }
    render() {
        return (
            <div>
                <h1>Homepage</h1>
                {this.state.videos}
                <script dangerouslySetInnerHTML={this.outputScript()} />
            </div>
        )
    }
}
