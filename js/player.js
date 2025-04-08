// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('movie-player');
    const sourceBtns = document.querySelectorAll('.source-btn');
    const qualitySelector = document.querySelector('.quality-selector select');
    const playbackSpeed = document.querySelector('.playback-speed select');
    
    // 视频源切换
    if (sourceBtns.length > 0 && videoPlayer) {
        sourceBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有按钮的active类
                sourceBtns.forEach(b => b.classList.remove('active'));
                
                // 添加当前按钮的active类
                this.classList.add('active');
                
                // 保存当前播放时间
                const currentTime = videoPlayer.currentTime;
                
                // 这里应该根据不同的源切换视频URL
                // 示例：根据按钮文本切换不同的视频源
                const sourceType = this.textContent.trim();
                let videoSource = '';
                
                switch(sourceType) {
                    case '高清源':
                        videoSource = 'videos/sample-hd.mp4';
                        break;
                    case '备用源1':
                        videoSource = 'videos/sample-alt1.mp4';
                        break;
                    case '备用源2':
                        videoSource = 'videos/sample-alt2.mp4';
                        break;
                    default:
                        videoSource = 'videos/sample.mp4';
                }
                
                // 更新视频源
                videoPlayer.src = videoSource;
                
                // 加载新视频并恢复播放位置
                videoPlayer.load();
                videoPlayer.addEventListener('loadedmetadata', function() {
                    videoPlayer.currentTime = currentTime;
                    if (!videoPlayer.paused) {
                        videoPlayer.play();
                    }
                }, { once: true });
            });
        });
    }
    
    // 画质切换
    if (qualitySelector && videoPlayer) {
        qualitySelector.addEventListener('change', function() {
            const quality = this.value;
            const currentTime = videoPlayer.currentTime;
            let videoSource = '';
            
            // 根据选择的画质切换视频源
            switch(quality) {
                case '1080p':
                    videoSource = 'videos/sample-1080p.mp4';
                    break;
                case '720p':
                    videoSource = 'videos/sample-720p.mp4';
                    break;
                case '480p':
                    videoSource = 'videos/sample-480p.mp4';
                    break;
                default:
                    videoSource = 'videos/sample.mp4';
            }
            
            // 更新视频源
            videoPlayer.src = videoSource;
            
            // 加载新视频并恢复播放位置
            videoPlayer.load();
            videoPlayer.addEventListener('loadedmetadata', function() {
                videoPlayer.currentTime = currentTime;
                if (!videoPlayer.paused) {
                    videoPlayer.play();
                }
            }, { once: true });
        });
    }
    
    // 播放速度调整
    if (playbackSpeed && videoPlayer) {
        playbackSpeed.addEventListener('change', function() {
            videoPlayer.playbackRate = parseFloat(this.value);
        });
    }
    
    // 评论点赞功能
    const likeButtons = document.querySelectorAll('.btn-like');
    
    if (likeButtons.length > 0) {
        likeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const likeCount = this.querySelector('span');
                let count = parseInt(likeCount.textContent);
                
                if (this.classList.contains('liked')) {
                    count--;
                    this.classList.remove('liked');
                } else {
                    count++;
                    this.classList.add('liked');
                }
                
                likeCount.textContent = count;
            });
        });
    }
    
    // 回复功能
    const replyButtons = document.querySelectorAll('.btn-reply');
    
    if (replyButtons.length > 0) {
        replyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const commentItem = this.closest('.comment-item');
                const replies = commentItem.querySelector('.replies');
                
                // 如果已经有回复表单，则移除
                const existingForm = commentItem.querySelector('.reply-form');
                if (existingForm) {
                    existingForm.remove();
                    return;
                }
                
                // 创建回复表单
                const replyForm = document.createElement('div');
                replyForm.className = 'comment-form reply-form';
                replyForm.innerHTML = `
                    <div class="user-avatar">
                        <img src="images/avatar.png" alt="用户头像">
                    </div>
                    <div class="comment-input">
                        <textarea placeholder="发表您的回复..."></textarea>
                        <button class="btn btn-primary">发表回复</button>
                    </div>
                `;
                
                // 添加回复表单
                if (replies) {
                    replies.prepend(replyForm);
                } else {
                    const newReplies = document.createElement('div');
                    newReplies.className = 'replies';
                    newReplies.appendChild(replyForm);
                    commentItem.querySelector('.comment-content').appendChild(newReplies);
                }
                
                // 添加发表回复的事件监听
                const submitReply = replyForm.querySelector('.btn-primary');
                submitReply.addEventListener('click', function() {
                    const replyText = replyForm.querySelector('textarea').value.trim();
                    
                    if (replyText) {
                        const newReply = document.createElement('div');
                        newReply.className = 'comment-item reply';
                        newReply.innerHTML = `
                            <div class="comment-avatar">
                                <img src="images/avatar.png" alt="用户头像">
                            </div>
                            <div class="comment-content">
                                <div class="comment-header">
                                    <h4>当前用户</h4>
                                    <span class="comment-time">刚刚</span>
                                </div>
                                <p class="comment-text">${replyText}</p>
                                <div class="comment-actions">
                                    <button class="btn-like"><i class="fas fa-thumbs-up"></i> <span>0</span></button>
                                    <button class="btn-reply">回复</button>
                                </div>
                            </div>
                        `;
                        
                        // 添加新回复并移除回复表单
                        replyForm.parentNode.insertBefore(newReply, replyForm);
                        replyForm.remove();
                        
                        // 为新添加的点赞按钮添加事件监听
                        const newLikeBtn = newReply.querySelector('.btn-like');
                        newLikeBtn.addEventListener('click', function() {
                            const likeCount = this.querySelector('span');
                            let count = parseInt(likeCount.textContent);
                            
                            if (this.classList.contains('liked')) {
                                count--;
                                this.classList.remove('liked');
                            } else {
                                count++;
                                this.classList.add('liked');
                            }
                            
                            likeCount.textContent = count;
                        });
                        
                        // 为新添加的回复按钮添加事件监听
                        const newReplyBtn = newReply.querySelector('.btn-reply');
                        newReplyBtn.addEventListener('click', function() {
                            const replyItem = this.closest('.comment-item');
                            const replyReplies = replyItem.querySelector('.replies');
                            
                            // 如果已经有回复表单，则移除
                            const existingReplyForm = replyItem.querySelector('.reply-form');
                            if (existingReplyForm) {
                                existingReplyForm.remove();
                                return;
                            }
                            
                            // 创建嵌套回复表单
                            const nestedReplyForm = document.createElement('div');
                            nestedReplyForm.className = 'comment-form reply-form';
                            nestedReplyForm.innerHTML = `
                                <div class="user-avatar">
                                    <img src="images/avatar.png" alt="用户头像">
                                </div>
                                <div class="comment-input">
                                    <textarea placeholder="发表您的回复..."></textarea>
                                    <button class="btn btn-primary">发表回复</button>
                                </div>
                            `;
                            
                            // 添加嵌套回复表单
                            if (replyReplies) {
                                replyReplies.prepend(nestedReplyForm);
                            } else {
                                const newReplyReplies = document.createElement('div');
                                newReplyReplies.className = 'replies';
                                newReplyReplies.appendChild(nestedReplyForm);
                                replyItem.querySelector('.comment-content').appendChild(newReplyReplies);
                            }
                            
                            // 递归处理嵌套回复的提交
                            const submitNestedReply = nestedReplyForm.querySelector('.btn-primary');
                            submitNestedReply.addEventListener('click', function() {
                                // 这里可以复用上面的回复逻辑，但为了避免过度嵌套，可以简化处理
                                const nestedReplyText = nestedReplyForm.querySelector('textarea').value.trim();
                                
                                if (nestedReplyText) {
                                    const nestedReply = document.createElement('div');
                                    nestedReply.className = 'comment-item reply';
                                    nestedReply.innerHTML = `
                                        <div class="comment-avatar">
                                            <img src="images/avatar.png" alt="用户头像">
                                        </div>
                                        <div class="comment-content">
                                            <div class="comment-header">
                                                <h4>当前用户</h4>
                                                <span class="comment-time">刚刚</span>
                                            </div>
                                            <p class="comment-text">${nestedReplyText}</p>
                                            <div class="comment-actions">
                                                <button class="btn-like"><i class="fas fa-thumbs-up"></i> <span>0</span></button>
                                            </div>
                                        </div>
                                    `;
                                    
                                    nestedReplyForm.parentNode.insertBefore(nestedReply, nestedReplyForm);
                                    nestedReplyForm.remove();
                                    
                                    // 为嵌套回复的点赞按钮添加事件监听
                                    const nestedLikeBtn = nestedReply.querySelector('.btn-like');
                                    nestedLikeBtn.addEventListener('click', function() {
                                        const nestedLikeCount = this.querySelector('span');
                                        let nestedCount = parseInt(nestedLikeCount.textContent);
                                        
                                        if (this.classList.contains('liked')) {
                                            nestedCount--;
                                            this.classList.remove('liked');
                                        } else {
                                            nestedCount++;
                                            this.classList.add('liked');
                                        }
                                        
                                        nestedLikeCount.textContent = nestedCount;
                                    });
                                }
                            });
                        });
                    }
                });
            });
        });
    }
    
    // 分页功能
    const pageButtons = document.querySelectorAll('.page-btn');
    
    if (pageButtons.length > 0) {
        pageButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.classList.contains('active') || this.classList.contains('page-dots')) {
                    return;
                }
                
                // 移除所有按钮的active类
                pageButtons.forEach(btn => btn.classList.remove('active'));
                
                // 添加当前按钮的active类
                this.classList.add('active');
                
                // 这里应该添加加载对应页面评论的逻辑
                // 示例：模拟加载中效果
                const commentsList = document.querySelector('.comments-list');
                
                if (commentsList) {
                    commentsList.innerHTML = '<div class="loading">评论加载中...</div>';
                    
                    // 模拟网络请求延迟
                    setTimeout(() => {
                        // 这里应该是从服务器获取对应页面的评论数据
                        // 示例：根据页码显示不同的评论
                        const pageNumber = this.textContent.trim();
                        
                        if (pageNumber === '1' || pageNumber === '前一页' || pageNumber === '后一页') {
                            // 恢复原始评论（示例）
                            commentsList.innerHTML = `
                                <div class="comment-item">
                                    <div class="comment-avatar">
                                        <img src="images/user1.jpg" alt="用户头像">
                                    </div>
                                    <div class="comment-content">
                                        <div class="comment-header">
                                            <h4>用户名</h4>
                                            <span class="comment-time">2023-06-15 14:30</span>
                                        </div>
                                        <p class="comment-text">这部电影太精彩了！特效非常震撼，剧情也很紧凑，强烈推荐！</p>
                                        <div class="comment-actions">
                                            <button class="btn-like"><i class="fas fa-thumbs-up"></i> <span>42</span></button>
                                            <button class="btn-reply">回复</button>
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else {
                            // 显示其他页面的评论（示例）
                            commentsList.innerHTML = `
                                <div class="comment-item">
                                    <div class="comment-avatar">
                                        <img src="images/user2.jpg" alt="用户头像">
                                    </div>
                                    <div class="comment-content">
                                        <div class="comment-header">
                                            <h4>页面${pageNumber}的用户</h4>
                                            <span class="comment-time">2023-06-16 10:15</span>
                                        </div>
                                        <p class="comment-text">这是第${pageNumber}页的评论内容示例。</p>
                                        <div class="comment-actions">
                                            <button class="btn-like"><i class="fas fa-thumbs-up"></i> <span>15</span></button>
                                            <button class="btn-reply">回复</button>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }
                        
                        // 重新绑定新加载评论的事件监听
                        bindCommentEvents();
                    }, 500);
                }
            });
        });
    }
    
    // 辅助函数：绑定评论相关事件
    function bindCommentEvents() {
        // 重新绑定点赞按钮事件
        document.querySelectorAll('.btn-like').forEach(button => {
            button.addEventListener('click', function() {
                const likeCount = this.querySelector('span');
                let count = parseInt(likeCount.textContent);
                
                if (this.classList.contains('liked')) {
                    count--;
                    this.classList.remove('liked');
                } else {
                    count++;
                    this.classList.add('liked');
                }
                
                likeCount.textContent = count;
            });
        });
        
        // 重新绑定回复按钮事件
        document.querySelectorAll('.btn-reply').forEach(button => {
            button.addEventListener('click', function() {
                // 这里可以复用上面的回复逻辑
                const commentItem = this.closest('.comment-item');
                const replies = commentItem.querySelector('.replies');
                
                // 如果已经有回复表单，则移除
                const existingForm = commentItem.querySelector('.reply-form');
                if (existingForm) {
                    existingForm.remove();
                    return;
                }
                
                // 创建回复表单
                const replyForm = document.createElement('div');
                replyForm.className = 'comment-form reply-form';
                replyForm.innerHTML = `
                    <div class="user-avatar">
                        <img src="images/avatar.png" alt="用户头像">
                    </div>
                    <div class="comment-input">
                        <textarea placeholder="发表您的回复..."></textarea>
                        <button class="btn btn-primary">发表回复</button>
                    </div>
                `;
                
                // 添加回复表单
                if (replies) {
                    replies.prepend(replyForm);
                } else {
                    const newReplies = document.createElement('div');
                    newReplies.className = 'replies';
                    newReplies.appendChild(replyForm);
                    commentItem.querySelector('.comment-content').appendChild(newReplies);
                }
                
                // 添加发表回复的事件监听
                const submitReply = replyForm.querySelector('.btn-primary');
                submitReply.addEventListener('click', function() {
                    // 这里可以复用上面的回复提交逻辑
                });
            });
        });
    }
});