# db/seeds.rb
#初期初期ストレッチデータ
stretches = [
  {
    name: '肩回し',
    description: '肩の筋肉をリラックスさせるストレッチです。',
    target_area: 'shoulder',
    difficulty: 1
  },
  {
    name: '首のストレッチ',
    description: '首の緊張を和らげるストレッチです。',
    target_area: 'neck',
    difficulty: 1
  },
  # 他のストレッチも追加
]

stretches.each do |stretch|
  Stretch.create!(stretch)
end
