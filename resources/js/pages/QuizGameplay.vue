<template>
  <!-- Verifica caso a questão atual seja menor que 10 (no caso 9 porque a questão 1 para código seria na verdade 0), vá prosseguindo até chegar na 11, que daí exibe a tela de finalização do quiz. Seria 50 perguntas se não fosse por essa validação, pois o banco de questões tem essa quantidade na qual seria listada -->
  <div v-if="currentQuestion < 10" class="flex flex-col justify-center items-center h-full w-1/3 m-auto mt-20">
    <!-- Componente que basicamente é tudo que aparece no quizgameplay, a logo do sistema, questões do quiz e o botão de seguir para a próxima questão -->
    <QuizQuestions :dashboardRedirect="dashboard().url" :time="time" :formattedTimer="formattedTimer">
      <!-- Componente de logo do sistema -->
      <QuizOnlineLogo/>
      <!-- Faz uma rápida verificação caso as questões trazidas do banco de dados via API não tenham chegado ainda, evantando carregar sem elas e dar erro de uncaught content -->
      <div v-if="questionsData.length > 0" class="w-full">
        <!-- Componente das questões com as opções -->
        <Questions
          :currentQuestion="currentQuestion"
          :questionsData="questionsData"
          :options="options"
          :selectedOption="selectedOption"
          @select="selectOption"
        />
      </div>
      <!-- Componente de prosseguir com o quiz, caso tenha sido selecionado uma das opções antes -->
      <NextButton
        :showButtonNext="showButtonNext"
        @next="nextQuestion"
      />
    </QuizQuestions>
  </div>
  <!-- Caso a questão utrapasse 10, é exibido a tela de finalização do quiz, mostrando os resultados obtidos pelo usuário -->
  <div v-else class="flex flex-col justify-center items-center h-150 w-1/3 m-auto mt-20 mq-quizgameplay-finalization">
    <QuizFinalResults
      :totalScore="totalScore"
      :rightAnsweredQuestions="rightAnsweredQuestions"
      :time="time"
      :formattedTimer="formattedTimer"
      :dashboardRedirect="dashboard().url"
      :replay-quiz="quizgameplay().url"
    />
  </div>
</template>
<script setup>
  /* Importação de Rotas do Laravel e funcionalidades do Vue.js, respectivamente*/
  import { dashboard, quizgameplay } from '@/routes';
  import { ref, onMounted, onBeforeUnmount } from 'vue';

  /* Importação de componentes do layout da tela em sí*/
  import Questions from '@/components/pages/QuizGameplay/Questions.vue';
  import Timer from '@/components/pages/QuizGameplay/Timer.vue';
  import NextButton from '@/components/pages/QuizGameplay/NextButton.vue';
  import QuizFinalResults from '@/components/pages/QuizGameplay/QuizFinalResults.vue';
  import QuizOnlineLogo from '@/components/QuizOnlineLogo.vue';
  import QuizQuestions from '@/components/pages/QuizGameplay/QuizQuestions.vue';

  /* Importação de funções auxiliares */
  import shuffleQuestions from '../functions/quizGamaplay/shuffleQuestions';
  import startTimer from '../functions/quizGamaplay/startTimer';
  import pointsCalculation from '../functions/quizGamaplay/pointCalculationBeforeNextQuestion';
  import quizResults from '../functions/quizGamaplay/quizResults';
  import formattedTimerFunc from '../functions/quizGamaplay/formattedTimer';
  import '../../css/media-query.css';

  //*OBS: ref() é um atributo especial que pode ser usado para obter uma referência
  //  direta a um elemento DOM ou a uma instância de componente filho após a sua montagem */

  let currentQuestion = ref(0); // Questão atual
  let selectedOption = ref(null); // Opção selecionada
  let showButtonNext = ref(false); // Flag para mostrar ou não o botão de "próximo"
  let totalScore = ref(0); // Armazenado a pontuação total obtida no quiz
  let rightAnsweredQuestions = ref(0); // Conta o número de questões acertadas no quiz
  let time = ref(0); // cronômetro zerado
  let timer = ref(null); // Temporarizador inicializado como nulo
  let questionsData = ref([]); // Onde os dados de todas as questões recebidas via api do banco de dados são armazenas
  const options = ref([]);

  const formattedTimer = formattedTimerFunc(time);
  const selectOption = (optionKey) => { // Arrow function que recebe a alternativa selecionada pelo usuário em uma questão
    const question = questionsData.value[currentQuestion.value]; // Recebe os dados da questão

    if (!question)return; // Se não houver dados, sai da função imediatamente

    selectedOption.value = optionKey; // Variável recebe do parâmetro da arrow function a opção marcada em uma questão 
    showButtonNext.value = true; // Botão avançar para a próxima questão é exibido novamente
  }

  async function fetchQuestions() { // Função para buscar as questões do banco de dados
    const response = await fetch('/quiz/questions'); // Aguarda uma resposta de requisição do endpoint 
    const data = await response.json(); // O aguardo da resposta quando recebida é transformada em formato JSON, para o consumo dos dados

    questionsData.value = shuffleQuestions(data); // Embaralha as questões usando o método Fisher-Yates
  }

  async function nextQuestion() { // Função de validação antes de prosseguir para a próxima questão do quiz
    pointsCalculation( // Função importadada que calcula os pontos obtidos pela questão com base na dificuldade e tempo gasto para responder
      questionsData,
      currentQuestion,
      selectedOption,
      totalScore,
      rightAnsweredQuestions,
      time,
    );
    
    if (currentQuestion.value === 9) { // Se for a última questão antes da tela de finalização do quiz
      clearInterval(timer.value); // O cronometro congela

      currentQuestion.value++; // É avançado para a tela de finalização do quiz

      await saveResults(); // Os resultados obtidos pelo usuário no quiz são armazenados no banco de dados

      return; // Retorna nada;
    }
    
    currentQuestion.value++;  // Avança normalmente para a próxima questão enquanto não for a última do quiz

    options.value = shuffleQuestions(['opcao_a','opcao_b','opcao_c','opcao_d']);
    
    selectedOption.value = null; // O botão que fica marcado quando selecionado volta ao estado deselecionado
    showButtonNext.value = false; // O botão "Próximo" após marca uma das alternativas desaparece novamente
  }

  async function saveResults() {
    await fetch('/quiz/save', { // Requisição para salvar os resultados obtidos pelo usuário no quiz na rota
      method: "POST", // Método para guardar no banco de dados
      headers: {
        "Content-Type": "application/json", // Tipo de conteúdo, no caso uma aplicação em formato JSON
        // CSRF (Cross-Site Request Forgery)
        //   Laravel gera um token único para cada sessão do usuário (csrf_token()) 
        //   e verifica esse token em requisições que modificam dados (POST, PUT, DELETE). 
        //   Se o token estiver faltando ou incorreto, a requisição é rejeitada.
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
      },
      body: JSON.stringify( // o JSON é stringficado, ou seja, transformando tudo em texto normal o que está contido no objeto "payload", retornado da função importada "quizResults"
        quizResults(
          totalScore,
          rightAnsweredQuestions,
          time
        )
      ), 
    });
  }

  onMounted(async() => { // Hook que carrega o que tem dentro dele apenas quando a página é carregada totalmente
    startTimer(timer, time); // O cronômetro do quiz é inicializado
    await fetchQuestions(); // Aguarda e recebe as questões do banco de dados via api
    
    options.value = shuffleQuestions(['opcao_a','opcao_b','opcao_c','opcao_d']); // Embaralha primeira pergunta
  });

  onBeforeUnmount(() => { // Antes de ocorrer um refresh na página ou qualquer outra saída, o que tem dentro do hook é ativado
    clearIntervel(timer.value); // Reseta o cronômetro 
  });
</script>