const colors = ['#E74C3C', '#C0392B', '#1ABC9C',
	'#16A085', '#2ECC71', '#27AE60', '#3498DB',
	'#2980B9', '#9B59B6', '#8E44AD', '#34495E',
	'#2C3E50', '#E67E22',
	'#D35400', '#7F8C8D'];

export function randomBg(){
  return colors[Math.ceil(Math.random()*colors.length-1)]
}
