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

## 8. Derive Timing from AUDIO_SEGMENTS (QUAN TRỌNG)

**TẤT CẢ animation delays PHẢI derive từ `AUDIO_SEGMENTS`, KHÔNG hardcode số frame.**

### Tại sao?

`AUDIO_SEGMENTS` giờ chứa **nhiều segment per scene** — mỗi segment = 1 câu narration với `startFrame`/`endFrame` chính xác từ SRT timestamps. Dùng `segments[N].startFrame` để từng visual element xuất hiện đúng lúc câu narration tương ứng được nói.

### Pattern 1: Multi-segment timing (BẮT BUỘC)

```tsx
export const MyScene: React.FC = () => {
  const segments = AUDIO_SEGMENTS[sceneKey];
  // Mỗi segment = 1 câu narration với startFrame/endFrame chính xác
  const seg0 = segments[0];                              // câu 1
  const seg1 = segments[1] ?? segments[0];               // câu 2 (fallback to câu 1)
  const seg2 = segments[2] ?? segments[1] ?? segments[0]; // câu 3

  return (
    <AbsoluteFill>
      {/* Focal visual — xuất hiện khi câu 1 bắt đầu */}
      <Animated delay={seg0.startFrame}>
        <LottieAsset ... />
      </Animated>

      {/* Title — xuất hiện khi câu 1 bắt đầu */}
      <AnimatedText delay={seg0.startFrame}>...</AnimatedText>

      {/* Cards — xuất hiện khi câu 2 bắt đầu */}
      <Animated delay={seg1.startFrame}>
        <StaggeredMotion ...>...</StaggeredMotion>
      </Animated>

      {/* Counter — xuất hiện khi câu 3 nói con số */}
      <AnimatedCounter delay={seg2.startFrame} />
    </AbsoluteFill>
  );
};
```

### Pattern 2: Stagger items within a segment

```tsx
// Narration: "Ba yếu tố: tốc độ, chính xác, và chi phí thấp"
// seg1 covers this sentence — stagger items within seg1's timespan
const seg1 = segments[1];

{ITEMS.map((item, i) => (
  <Animated delay={seg1.startFrame + i * 15} key={item.label}>
    <Card {...item} />
  </Animated>
))}

// Hoặc dùng StaggeredMotion (stagger tự động từ seg1)
<Animated delay={seg1.startFrame}>
  <StaggeredMotion
    transition={{ stagger: 8, opacity: [0, 1], y: [30, 0], duration: 25 }}
  >
    {ITEMS.map(item => <Card key={item.label} {...item} />)}
  </StaggeredMotion>
</Animated>
```

### Pattern 3: Counter synced to specific sentence

```tsx
// Narration seg2: "...tiết kiệm hơn 10 giờ mỗi tuần"
const seg2 = segments[2];

<AnimatedCounter
  transition={{
    values: [0, 10],
    duration: 90,
    delay: seg2.startFrame,
    easing: "easeOut",
  }}
/>
```

### Pattern 4: Spring entrance synced to segment

```tsx
const seg1 = segments[1];
const iconAppear = spring({ frame: frame - seg1.startFrame, fps, config: { damping: 200 } });
```

### Pattern 5: Fallback when only 1 segment

```tsx
// Nếu scene chỉ có 1 segment, chia duration thành 3 phần
const seg = segments[0];
const duration = seg.endFrame - seg.startFrame;
const t1 = seg.startFrame;
const t2 = seg.startFrame + Math.round(duration * 0.35);
const t3 = seg.startFrame + Math.round(duration * 0.65);
```

### Anti-patterns (TUYỆT ĐỐI KHÔNG)

```tsx
// SAI: Arbitrary offsets — không khớp narration
delay={startFrame + 80}   // 80 là gì? câu nào?
delay={startFrame + 120}  // 120 là gì?

// SAI: Hardcoded delays
delay={40}
delay={55}

// ĐÚNG: Dùng segment index
delay={segments[0].startFrame}   // câu 1
delay={segments[1].startFrame}   // câu 2
delay={segments[2].startFrame}   // câu 3
```

### Hold frame pattern

```tsx
const seg0 = segments[0];
const appear = spring({ frame: frame - seg0.startFrame, fps, config: { damping: 200 } });
<div style={{ opacity: appear, transform: `scale(${appear})` }}>
  {content}
</div>
```

---

## Checklist trước khi code mỗi scene

- [ ] Scene chỉ truyền tải 1 ý chính?
- [ ] Mỗi visual element map tới 1 segment index (`segments[0]`, `[1]`, `[2]`)?
- [ ] **KHÔNG dùng arbitrary offset** (`startFrame + 80`) — dùng `segments[N].startFrame`?
- [ ] Có khoảng hold (2-3s) sau khi element xuất hiện?
- [ ] Ambient layer đủ nhẹ (opacity < 0.15)?
- [ ] Animation entrance đủ chậm (20-30 frames)?
- [ ] Spring config smooth (damping: 200) cho hầu hết motion?
- [ ] Chỉ 1 focal point tại mỗi thời điểm?
- [ ] Max 4 visual elements per scene?
- [ ] Dùng `LAYOUT`/`ZONES` constants thay vì magic pixels?
