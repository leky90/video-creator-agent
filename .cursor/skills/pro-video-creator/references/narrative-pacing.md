# Narrative Pacing & Storytelling Rhythm

Tài liệu này là **quy tắc nền tảng** của toàn bộ video production. Mọi quyết định visual, animation, timing đều phải phục vụ nhịp kể chuyện.

> **Nguyên tắc vàng: Motion phục vụ narration, không phải ngược lại.**
>
> Nếu tắt tiếng mà video vẫn "đẹp" nhưng không hiểu gì → thất bại.
> Nếu chỉ nghe audio mà vẫn hiểu 80% nội dung → đúng hướng.
> Nếu cả audio + visual kết hợp tạo ra hiểu biết sâu hơn → thành công.

---

## 1. Triết lý sản xuất

### Animated Explainer ≠ Motion Graphics Show

| Animated Explainer (đúng) | Motion Graphics Show (sai) |
|---|---|
| Visual minh họa cho lời kể | Visual tự thể hiện, lời kể bổ sung |
| Nhịp chậm, có khoảng lặng | Nhịp nhanh, liên tục |
| Mỗi element xuất hiện có lý do | Elements xuất hiện vì "đẹp" |
| Người xem nhớ nội dung | Người xem nhớ hiệu ứng |
| Kurzgesagt, The School of Life | Quảng cáo, intro YouTube |

### Thứ tự ưu tiên khi thiết kế scene

1. **Narration nói gì?** → Đây là nền tảng
2. **Cảm xúc nào cần truyền tải?** → Tò mò? Lo lắng? Hy vọng? Thỏa mãn?
3. **Hình ảnh nào giúp hiểu nhanh hơn?** → Minh họa concept, không trang trí
4. **Motion nào hướng dẫn mắt?** → Dẫn dắt chú ý, không gây xao nhãng

---

## 2. Emotional Arc (Đường cong cảm xúc)

Mỗi video phải có đường cong cảm xúc rõ ràng:

```
Curiosity → Tension → Insight → Wonder → Satisfaction
(Tò mò)   (Căng thẳng) (Hiểu ra) (Kinh ngạc) (Thỏa mãn)
```

Map vào cấu trúc PAS:

| Phase | Cảm xúc | Nhịp | Visual tone |
|---|---|---|---|
| Hook | Tò mò, bất ngờ | Nhanh → pause | Dramatic, câu hỏi lớn |
| Problem | Đồng cảm | Vừa | Tối, nặng nề |
| Agitate | Lo lắng, khó chịu | Tăng dần | Đỏ, vỡ vụn, áp lực |
| Solution | Nhẹ nhõm, hy vọng | Chậm lại → vừa | Sáng, xanh, mở rộng |
| How it works | Tập trung, hiểu biết | Đều đặn | Rõ ràng, có cấu trúc |
| CTA | Tự tin, hành động | Vừa → pause cuối | Năng lượng, tích cực |

---

## 3. Pacing Rules (Quy tắc nhịp)

### 3a. Silence is power

- **Pause 0.5-1s** sau mỗi câu quan trọng → để người xem xử lý
- **Pause 1-2s** giữa các scene → chuyển cảnh không vội
- **Không lấp đầy mọi khoảnh khắc** bằng animation — khoảng lặng tạo trọng lượng

Trong `segments.json`, kiểm soát qua `durationInSeconds`:
- Câu đơn giản: duration = audio length + 0.5s
- Câu quan trọng: duration = audio length + 1-1.5s
- Chuyển phase (Problem → Solution): duration = audio length + 2s

### 3b. One idea, one scene

- Mỗi scene chỉ truyền tải **MỘT ý chính**
- Nếu scene cần giải thích 2 ý → tách thành 2 scene
- Text trên màn hình: tối đa 1 headline + 1 subtitle cùng lúc

### 3c. Visual reveal timing

Visual elements phải xuất hiện **đúng lúc narration đề cập**:

```
Narration: "Trí tuệ nhân tạo đang thay đổi cách chúng ta làm việc"
                    ^                              ^
                    |                              |
              AI icon xuất hiện            work icons xuất hiện
```

**KHÔNG ĐƯỢC:**
- Visual xuất hiện trước narration (spoil)
- Visual xuất hiện sau narration quá 0.5s (lag)
- Tất cả visual xuất hiện cùng lúc (overwhelm)

### 3d. Stagger = storytelling

Stagger timing phải theo logic nội dung, không chỉ aesthetic:

```
Narration: "Ba yếu tố: tốc độ, chính xác, và chi phí thấp"
                        ^         ^              ^
                     item 1    item 2          item 3
                     (ngay)   (+0.8s)         (+0.8s)
```

Stagger delay nên = thời gian narration cần để nói từng item (thường 0.5-1s).

---

## 4. Motion Principles (Nguyên tắc chuyển động)

### 4a. Purposeful motion

Mỗi animation phải trả lời: **"Animation này giúp người xem hiểu gì?"**

| Purpose | Ví dụ | Cho phép |
|---|---|---|
| Reveal | Icon xuất hiện khi narration đề cập | ✅ |
| Emphasize | Pulse/glow khi đề cập số liệu quan trọng | ✅ |
| Connect | Đường kẻ nối 2 concepts có quan hệ | ✅ |
| Transition | Fade giữa 2 ý | ✅ |
| Decorate | Particles bay vì đẹp | ⚠️ Hạn chế |
| Show off | Complex animation không liên quan | ❌ |

### 4b. Simple > Complex

Kurzgesagt dùng **rất ít loại motion**:

1. **Fade in** (opacity 0→1) — reveal element
2. **Scale in** (spring 0→1) — element xuất hiện
3. **Slide** (translateX/Y) — element di chuyển vào vị trí
4. **Pulse** (subtle scale oscillation) — nhấn mạnh
5. **Draw** (strokeDashoffset) — đường kẻ/arrow vẽ ra

Đó là gần hết. Không cần 3D, không cần particle storm, không cần complex physics.

### 4c. Slow is smooth, smooth is fast

- Entrance animation: **20-30 frames** (0.7-1s) — không nhanh hơn
- Exit/fade out: **15-20 frames** (0.5-0.7s)
- Spring config: `{ damping: 200 }` (smooth, no bounce) cho hầu hết trường hợp
- Bouncy spring (`{ damping: 8 }`) chỉ dùng cho **playful moments** (max 1-2 lần/video)

### 4d. Hold frames

Sau khi element xuất hiện, nó phải **đứng yên ít nhất 2-3 giây** để người xem đọc/hiểu. Không animate liên tục.

```
[Fade in 1s] → [HOLD 3s — người xem đọc] → [Fade out 0.5s]
```

---

## 5. Visual Hierarchy per Scene

Mỗi scene chỉ có **1 focal point** tại mỗi thời điểm:

```
Layer 1 (bg):     Gradient/solid — KHÔNG attract attention
Layer 2 (ambient): Particles rất nhẹ (opacity < 0.15) — atmosphere only
Layer 3 (content): Main illustration/graphic — FOCAL POINT
Layer 4 (text):   Headline/label — support content
Layer 5 (subtitle): Bottom subtitle bar — luôn đọc được
```

**Quy tắc:**
- Layer 2 (ambient) không được nổi bật hơn Layer 3 (content)
- Khi headline xuất hiện, illustration nên đã ổn định (không đang animate)
- Subtitle luôn ở bottom, luôn contrast rõ, không bị che

---

## 6. Scene Duration Guidelines

| Loại scene | Duration gợi ý | Lý do |
|---|---|---|
| Hook | 8-12s | Ngắn, gây tò mò ngay |
| Problem | 12-18s | Đủ để đồng cảm |
| Agitate | 10-15s | Tăng tension nhưng không kéo dài |
| Solution | 15-25s | Cần thời gian giải thích rõ |
| How it works | 20-35s | Scene dài nhất, nhiều sub-points |
| CTA | 8-12s | Ngắn gọn, rõ ràng |
| **Tổng** | **~90-120s** | Sweet spot cho explainer |

---

## 7. Audio-Visual Sync Patterns

### Pattern 1: Reveal on mention
```
Narration word → Visual appears (0-0.3s delay)
```
Dùng cho: icons, illustrations, text labels

### Pattern 2: Build with narration
```
Narration describes process → Visual builds step by step
```
Dùng cho: diagrams, flowcharts, timelines

### Pattern 3: Emotional backdrop
```
Narration tone shifts → Background color/mood shifts
```
Dùng cho: scene transitions, mood changes (problem=dark → solution=bright)

### Pattern 4: Emphasis pulse
```
Narration hits key number/fact → Visual pulses/glows
```
Dùng cho: statistics, important claims

### Pattern 5: Contrast cut
```
Narration says "but..." / "however..." → Hard cut to contrasting visual
```
Dùng cho: problem↔solution transitions, before↔after

---

## 8. Implementation in Remotion

### Deriving timing from AUDIO_SEGMENTS

```tsx
// ĐÚNG: Animation bắt đầu khi narration bắt đầu
const revealStart = AUDIO_SEGMENTS.solution[0].startFrame;
const iconAppear = spring({ frame: frame - revealStart, fps, config: { damping: 200 } });

// SAI: Hardcode frame number không liên quan narration
const iconAppear = spring({ frame: frame - 30, fps });
```

### Hold frame pattern

```tsx
const appear = spring({ frame: frame - startFrame, fps, config: { damping: 200 } });
// Element appears and STAYS — no continuous animation after entrance
<div style={{ opacity: appear, transform: `scale(${appear})` }}>
  {content}
</div>
```

### Narration-synced stagger

```tsx
// Stagger delay dựa trên narration timing, không phải aesthetic
const ITEMS_TIMING = [
  { label: "Tốc độ", startFrame: AUDIO_SEGMENTS.how_it_works[0].startFrame },
  { label: "Chính xác", startFrame: AUDIO_SEGMENTS.how_it_works[0].startFrame + 25 },
  { label: "Chi phí thấp", startFrame: AUDIO_SEGMENTS.how_it_works[0].startFrame + 50 },
];
```

---

## Checklist trước khi code mỗi scene

- [ ] Scene chỉ truyền tải 1 ý chính?
- [ ] Visual elements xuất hiện đúng lúc narration đề cập?
- [ ] Có khoảng hold (2-3s) sau khi element xuất hiện?
- [ ] Ambient layer đủ nhẹ (opacity < 0.15)?
- [ ] Animation entrance đủ chậm (20-30 frames)?
- [ ] Spring config smooth (damping: 200) cho hầu hết motion?
- [ ] Chỉ 1 focal point tại mỗi thời điểm?
- [ ] Scene duration hợp lý với lượng nội dung?
